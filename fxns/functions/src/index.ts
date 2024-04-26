/**
 * triggers at https://firebase.google.com/docs/functions
 */

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

// function to add user to firestore on account creation
export const onAccountCreated = functions.auth.user().onCreate(async (user) => {
    try {
        const {uid, email, displayName} = user;

        // Add user information to Firestore
        await admin.firestore().collection("users").doc(email || uid).set({
            email,
            uid,
            name: displayName,
            createdat: admin.firestore.FieldValue.serverTimestamp(),
            onboarded: false,
            matched: [],
            rejected: [],
            liked: [],
        });

        console.log("-----------------");
        console.log(`User ${email + uid} added to Firestore.`);
    } catch (error) {
        console.error("Error adding user to Firestore:", error);
    }
});
