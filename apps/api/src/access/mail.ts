import { createConnection } from 'node:net';
import { createInterface } from 'node:readline';

// Mailpit accepts unauthenticated SMTP in local development. A production sender
// can replace this function without changing the access flow.
export async function sendLocalLink(email: string, url: string): Promise<void> {
  const socket = createConnection({
    host: process.env.SMTP_HOST ?? 'localhost',
    port: Number(process.env.SMTP_PORT ?? 1025),
  });
  socket.setTimeout(10_000, () => socket.destroy(new Error('SMTP timed out')));
  const lines = createInterface({ input: socket, crlfDelay: Infinity });
  const iterator = lines[Symbol.asyncIterator]();

  async function expect(code: number) {
    while (true) {
      const next = await iterator.next();
      if (next.done) throw new Error('SMTP connection closed');
      const line = next.value;
      if (Number(line.slice(0, 3)) !== code)
        throw new Error(`SMTP rejected command: ${line}`);
      if (line[3] === ' ') return;
    }
  }

  async function command(value: string, code: number) {
    socket.write(`${value}\r\n`);
    await expect(code);
  }

  try {
    await expect(220);
    await command('EHLO localhost', 250);
    await command('MAIL FROM:<access@localhost>', 250);
    await command(`RCPT TO:<${email}>`, 250);
    await command('DATA', 354);
    socket.write(
      `From: Bolão <access@localhost>\r\nTo: <${email}>\r\nSubject: Seu link de acesso ao Bolao\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\nAcesse o Bolão pelo link abaixo. Ele vale por 15 minutos e só pode ser usado uma vez.\r\n\r\n${url}\r\n.\r\n`,
    );
    await expect(250);
    await command('QUIT', 221);
  } finally {
    lines.close();
    socket.destroy();
  }
}
