<script setup lang="ts">
import { onMounted, ref } from 'vue';

type Person = { id: string; email: string };
type State =
  | 'loading'
  | 'ready'
  | 'sending'
  | 'sent'
  | 'confirming'
  | 'confirmed'
  | 'error';

const email = ref('');
const person = ref<Person | null>(null);
const state = ref<State>('loading');
const error = ref('');

async function loadSession() {
  try {
    const response = await fetch('/api/access/session');
    if (response.ok) person.value = (await response.json()).person as Person;
    else if (response.status !== 401) throw new Error();
    state.value = 'ready';
  } catch {
    error.value =
      'Não foi possível verificar sua sessão. Tente recarregar a página.';
    state.value = 'error';
  }
}

onMounted(async () => {
  const url = new URL(window.location.href);
  const token = url.searchParams.get('token');
  if (!token) return loadSession();
  window.history.replaceState({}, '', '/');
  state.value = 'confirming';
  try {
    const response = await fetch('/api/access/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    if (!response.ok) {
      error.value =
        response.status === 400
          ? 'Este link é inválido, venceu ou já foi usado. Solicite outro.'
          : 'Não foi possível confirmar seu acesso. Tente novamente.';
      state.value = 'error';
      return;
    }
    await loadSession();
    if (person.value) state.value = 'confirmed';
  } catch {
    error.value = 'Não foi possível confirmar seu acesso. Tente novamente.';
    state.value = 'error';
  }
});

async function requestLink() {
  state.value = 'sending';
  error.value = '';
  try {
    const response = await fetch('/api/access/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value }),
    });
    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      error.value = body.error ?? 'Não foi possível enviar o link.';
      state.value = 'error';
      return;
    }
    state.value = 'sent';
  } catch {
    error.value = 'Não foi possível enviar o link. Tente novamente.';
    state.value = 'error';
  }
}

async function logout() {
  try {
    const response = await fetch('/api/access/session', { method: 'DELETE' });
    if (!response.ok) throw new Error();
    person.value = null;
    email.value = '';
    state.value = 'ready';
  } catch {
    error.value = 'Não foi possível sair. Tente novamente.';
    state.value = 'error';
  }
}
</script>

<template>
  <main class="page">
    <div class="brand">BOLÃO <span>●</span> 2026</div>
    <section class="card" aria-labelledby="title">
      <p class="eyebrow">Seu lugar no jogo</p>
      <h1 id="title">Entre no bolão</h1>
      <p class="intro">
        Use seu e-mail para receber um link de acesso. Sem senha, sem
        complicação.
      </p>

      <p v-if="state === 'loading' || state === 'confirming'" role="status">
        {{
          state === 'confirming'
            ? 'Confirmando seu acesso…'
            : 'Verificando sua sessão…'
        }}
      </p>

      <template v-else-if="person">
        <p v-if="state === 'confirmed'" class="notice" role="status">
          E-mail confirmado. Você já pode entrar.
        </p>
        <p class="signed-in">
          Você entrou como <strong>{{ person.email }}</strong
          >.
        </p>
        <p class="hint">Seus bolões aparecerão aqui em breve.</p>
        <button type="button" class="secondary" @click="logout">Sair</button>
        <p v-if="error" class="error" role="alert">
          {{ error }}
        </p>
      </template>

      <template v-else>
        <p v-if="state === 'sent'" class="notice" role="status">
          Se o endereço puder receber e-mails, enviaremos um link de acesso.
          Confira sua caixa de entrada.
        </p>
        <p v-if="error" class="error" role="alert">
          {{ error }}
        </p>
        <form @submit.prevent="requestLink">
          <label for="email">Seu e-mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            autocomplete="email"
            required
            maxlength="254"
            placeholder="voce@exemplo.com"
          />
          <button type="submit" :disabled="state === 'sending'">
            {{ state === 'sending' ? 'Enviando…' : 'Enviar link de acesso' }}
          </button>
        </form>
        <p class="hint">O link vale por 15 minutos e pode ser usado uma vez.</p>
      </template>
    </section>
    <p class="footer">Um bolão para viver cada partida junto.</p>
  </main>
</template>

<style>
:root {
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  color: #18283b;
  background: #f5f3e9;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}
.brand {
  font-weight: 900;
  letter-spacing: 0.16em;
  color: #174434;
  margin-bottom: 2rem;
}
.brand span {
  color: #e68b43;
}
.card {
  width: min(100%, 28rem);
  padding: clamp(1.5rem, 6vw, 2.5rem);
  background: #fff;
  border: 1px solid #e4e6db;
  border-radius: 1rem;
  box-shadow: 0 1.5rem 3rem #173f2912;
}
.eyebrow {
  margin: 0 0 0.7rem;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #24684e;
}
h1 {
  margin: 0;
  font-size: clamp(2rem, 7vw, 2.7rem);
  line-height: 1.1;
  letter-spacing: -0.035em;
}
.intro {
  margin: 1rem 0 2rem;
  line-height: 1.55;
  color: #536474;
}
label {
  display: block;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  height: 3rem;
  border: 1px solid #aab5b3;
  border-radius: 0.55rem;
  padding: 0 0.9rem;
  font: inherit;
}
input:focus-visible,
button:focus-visible {
  outline: 3px solid #ec9a57;
  outline-offset: 2px;
}
button {
  width: 100%;
  min-height: 3rem;
  margin-top: 1rem;
  border: 0;
  border-radius: 0.55rem;
  color: white;
  background: #185c43;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}
button:hover {
  background: #104632;
}
button:disabled {
  opacity: 0.7;
  cursor: wait;
}
button.secondary {
  color: #185c43;
  background: #e6f1e9;
}
button.secondary:hover {
  background: #d5e7da;
}
.notice,
.error {
  padding: 0.9rem 1rem;
  border-radius: 0.55rem;
  line-height: 1.5;
}
.notice {
  background: #e6f1e9;
  color: #174434;
}
.error {
  background: #fff0e8;
  color: #923b24;
}
.signed-in {
  line-height: 1.6;
  overflow-wrap: anywhere;
}
.hint {
  margin: 1.25rem 0 0;
  color: #60707c;
  font-size: 0.88rem;
  line-height: 1.5;
}
.footer {
  margin: 2rem 0 0;
  color: #64736e;
  font-size: 0.85rem;
  text-align: center;
}
</style>
