import { getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { app } from './firebaseConfig'; // Ajuste o caminho conforme necessário

const auth = getAuth(app);

export async function loginWithEmailAndPassword(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Sucesso no login
    return userCredential;
  } catch (error) {
    // Erro no login
    throw new Error(error.message);
  }
}

export async function logout() {
  try {
    await signOut(auth);
    console.log('Logout bem-sucedido!');
  } catch (error) {
    console.error('Erro ao deslogar:', error);
    throw new Error(error.message);
  }
}

export default {auth};