import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../firebase";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInAsGuest: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>
  error: string | null
  loading: boolean
  signUpLoading: boolean
  guest: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => { },
  signIn: async () => { },
  signInAsGuest: async () => { },
  logOut: async () => { },
  error: null,
  loading: false,
  signUpLoading: false,
  guest: false,
})

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [signUpLoading, setSignUpLoading] = useState(false)
  const [guest, setGuest] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(null)
  const [initialLoading, setInitalLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
        router.push(`/login`)
      }
      setInitalLoading(false)
    })
  }, [auth])
  
  const signUp = async (email:string, password: string)  => {
    setSignUpLoading(true)
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
        setUser(userCredentials.user);
        router.push(`/user`);
      })
      .catch((error) => {
        setError(error);
        alert(error.message);
        setSignUpLoading(false);
      }).finally(() => setSignUpLoading(true));
  }

  const signIn = async (email:string, password: string) => {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      setLoading(true)
      setUser(userCredentials.user)
      router.push(`/`)
    }).catch((error) => {
      setLoading(false)
      setError(error)
      alert(error.message)
    })
  }
  const signInAsGuest = async (email:string, password: string) => {
    setGuest(true)
    await signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      setUser(userCredentials.user)
      setGuest(true)
      router.push(`/`)
    }).catch((error) => {
      setGuest(false)
      setError(error)
      alert(error.message)
    }).finally(() => setGuest(false))
  }

  const logOut = async () => {
    setLoading(true)
    signOut(auth).then(() => {
      setUser(null)
    }).catch((error) => {
      setError(error)
      alert(error.message)
    }).finally(() => setLoading(false))
  }
  
  const memodValue = useMemo(
    () => ({
      user,
      signIn,
      signInAsGuest,
      signUp,
      logOut,
      loading,
      signUpLoading,
      guest,
      error,
    }),[user, loading]
  )
  return (
    <AuthContext.Provider value={memodValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )

}

export default function useAuth() {
  return useContext(AuthContext)
}