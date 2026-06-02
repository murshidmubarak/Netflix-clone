import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "../fireBase";
import { AuthContext } from "./AuthContext";

export const WatchlistContext = createContext();

const WatchlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [savedMovies, setSavedMovies] = useState([]);

  const fetchWatchlist = async () => {
    if (!user) return;
    
    try {
      const q = query(
        collection(db, "watchlist"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);
      const movies = snapshot.docs.map(doc => ({
        firebaseId: doc.id,
        ...doc.data()
      }));

      setSavedMovies(movies);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, [user]);

  const addToWatchlist = async (movie) => {
    try {
      // Check for duplicates
      const exists = savedMovies.find(item => item.id === movie.id);
      if (exists) {
        alert("Already in watchlist");
        return;
      }

      // Add to Firestore
      const docRef = await addDoc(collection(db, "watchlist"), {
        userId: user.uid,
        id: movie.id,
        title: movie.title || movie.name || "Untitled",
        poster_path: movie.poster_path || null,
        addedAt: new Date().toISOString()
      });

      // Update local state
      const newMovie = {
        firebaseId: docRef.id,
        userId: user.uid,
        id: movie.id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
        addedAt: new Date().toISOString()
      };
      
      setSavedMovies(prev => [...prev, newMovie]);
      alert("✅ Movie added to watchlist!");

    } catch (error) {
      console.error("Add error:", error);
      alert(`Failed to add: ${error.message}`);
    }
  };

  const removeFromWatchlist = async (firebaseId) => {
    try {
      await deleteDoc(doc(db, "watchlist", firebaseId));
      setSavedMovies(prev => prev.filter(movie => movie.firebaseId !== firebaseId));
      alert("✅ Movie removed from watchlist");
    } catch (error) {
      console.error("Remove error:", error);
      alert("Failed to remove movie");
    }
  };

  return (
    <WatchlistContext.Provider
      value={{
        savedMovies,
        addToWatchlist,
        removeFromWatchlist
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;