import type { FastifyInstance } from 'fastify';
import { SESSION_LIFETIME_MS, type AccessDependencies } from './application.js';
import { createAccess } from './application.js';

const cookieName = 'bolao_session';
const sessionAgeSeconds = SESSION_LIFETIME_MS / 1000;
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const tokenPattern = /^[A-Za-z0-9_-]{43}$/;

function sessionFromCookie(cookie: string | undefined) {
  return cookie
    ?.split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${cookieName}=`))
    ?.slice(cookieName.length + 1);
}

function cookie(token: string, secure: boolean, maxAge: number) {
  return `${cookieName}=${token}; HttpOnly; SameSite=Lax; Path=/api; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
}

export function registerAccessRoutes(
  app: FastifyInstance,
  dependencies: AccessDependencies,
  secureCookies: boolean,
) {
  const access = createAccess(dependencies);

  app.post<{ Body: { email?: unknown } }>(
    '/api/access/links',
    async (request, reply) => {
      const email =
        typeof request.body?.email === 'string'
          ? request.body.email.trim().toLowerCase()
          : '';
      if (email.length > 254 || !emailPattern.test(email)) {
        return reply.code(400).send({ error: 'Informe um e-mail válido.' });
      }
      try {
        await access.requestLink(email);
      } catch (error) {
        app.log.error(error, 'Could not send access link');
        return reply
          .code(503)
          .send({ error: 'Não foi possível enviar o link. Tente novamente.' });
      }
      return reply.code(202).send({
        message:
          'Se o endereço puder receber e-mails, enviaremos um link de acesso.',
      });
    },
  );

  app.post<{ Body: { token?: unknown } }>(
    '/api/access/confirm',
    async (request, reply) => {
      const token = request.body?.token;
      if (typeof token !== 'string' || !tokenPattern.test(token)) {
        return reply.code(400).send({ error: 'Link inválido ou vencido.' });
      }
      const session = await access.consumeLink(token);
      if (!session)
        return reply.code(400).send({ error: 'Link inválido ou vencido.' });
      reply.header(
        'Set-Cookie',
        cookie(session, secureCookies, sessionAgeSeconds),
      );
      return reply.send({ status: 'authenticated' });
    },
  );

  app.get('/api/access/session', async (request, reply) => {
    const token = sessionFromCookie(request.headers.cookie);
    const person = token ? await access.personForSession(token) : null;
    if (!person) return reply.code(401).send({ error: 'Sessão indisponível.' });
    return { person };
  });

  app.delete('/api/access/session', async (request, reply) => {
    const token = sessionFromCookie(request.headers.cookie);
    if (token) await access.revokeSession(token);
    reply.header('Set-Cookie', cookie('', secureCookies, 0));
    return reply.code(204).send();
  });
}
