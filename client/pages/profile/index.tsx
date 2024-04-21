import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import styles from './profile.module.scss';

type ProfileState = {
  name: string;
  bio: string;
  age: string;
  gender: string;
  major: string;
  grade: string;
  pictures: File[];
};

const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileState>({
    name: '',
    bio: '',
    age: '',
    gender: '',
    major: '',
    grade: '',
    pictures: [],
  });
  const [user, setUser] = useState<ReturnType<typeof getAuth>['currentUser'] | null>(null);

  const db = getFirestore();
  const storage = getStorage();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, 'profiles', currentUser.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as ProfileState;
            setProfile({ ...data, pictures: [] });  // Resetting pictures as we don't fetch them
          } else {
            console.log("No profile data found for this user");
          }
        }).catch(error => {
          console.error("Error fetching profile data:", error);
        });
      }
    });
  }, [auth, db]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfile(prev => ({ ...prev, pictures: Array.from(event.target.files) }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      console.log("No user logged in");
      return;
    }

    const userId = user.uid;
    try {
      await setDoc(doc(db, 'profiles', userId), { ...profile }, { merge: true });

      const uploadPromises = profile.pictures.map((picture) => {
        const picRef = ref(storage, `profile-pictures/${userId}/${picture.name}`);
        return uploadBytes(picRef, picture);
      });

      await Promise.all(uploadPromises);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className={styles.profile}>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Name:</label>
          <input type="text" name="name" value={profile.name} onChange={handleInputChange} />
        </div>
        <div className={styles.inputGroup}>
          <label>Bio:</label>
          <textarea name="bio" value={profile.bio} onChange={handleInputChange} />
        </div>
        <div className={styles.inputGroup}>
          <label>Age:</label>
          <input type="number" name="age" value={profile.age} onChange={handleInputChange} />
        </div>
        <div className={styles.inputGroup}>
          <label>Gender:</label>
          <select name="gender" value={profile.gender} onChange={handleInputChange}>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label>Major:</label>
          <input type="text" name="major" value={profile.major} onChange={handleInputChange} />
        </div>
<div className={styles.inputGroup}>
  <label>Grade:</label>
  <select name="grade" value={profile.grade} onChange={handleInputChange}>
    <option value="">Select...</option>
    <option value="freshman">Freshman</option>
    <option value="sophomore">Sophomore</option>
    <option value="junior">Junior</option>
    <option value="senior">Senior</option>
  </select>
</div>
<div className={styles.inputGroup}>
  <label>Pictures:</label>
  <input type="file" name="pictures" multiple onChange={handleFileChange} />
</div>
<button type="submit">Update Profile</button>
</form>
</div>);

}   
export default ProfilePage;