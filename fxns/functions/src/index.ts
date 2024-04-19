/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

/* import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger"; */
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onAccountCreated = functions.auth.user().onCreate(async (user) => {
    try {
        const {uid, email, displayName} = user;

        // Add user information to Firestore
        await admin.firestore().collection("users").doc(email || uid).set({
            email,
            uid,
            name: displayName,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            submitted: false,
        });

        console.log(`User ${email + uid} added to Firestore.`);
    } catch (error) {
        console.error("Error adding user to Firestore:", error);
    }
});
