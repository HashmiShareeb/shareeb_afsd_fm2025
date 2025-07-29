import { Injectable } from '@nestjs/common'
import { App, applicationDefault, initializeApp } from 'firebase-admin/app'
import { Auth } from 'firebase-admin/lib/auth/auth'
import { getAuth } from 'firebase-admin/auth'

import * as dotenv from 'dotenv'

dotenv.config()

// Log to verify the variable is loaded
console.log(
  'GOOGLE_APPLICATION_CREDENTIALS:',
  process.env.GOOGLE_APPLICATION_CREDENTIALS,
)

// Throw error if variable is not set
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error(
    "Environment variable 'GOOGLE_APPLICATION_CREDENTIALS' is not set in .env file.",
  )
}

@Injectable()
export class FirebaseService {
  private firebaseApp: App

  constructor() {
    try {
      this.firebaseApp = initializeApp({
        credential: applicationDefault(), // Uses GOOGLE_APPLICATION_CREDENTIALS from .env
      })
      console.log(
        'Firebase initialized successfully with project ID:',
        this.firebaseApp.options.projectId,
      )
    } catch (error) {
      throw new Error(
        `Firebase app initialization failed: ${error.message}\nEnsure GOOGLE_APPLICATION_CREDENTIALS in .env points to a valid service account JSON file.
        \n⛔️ Firebase app not initialized.\nYou probably forgot to set the \`GOOGLE_APPLICATION_CREDENTIALS\` environment variable.\n`,
      )
    }
  }

  getAuth = (): Auth => getAuth(this.firebaseApp)
}
