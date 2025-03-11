import {Injectable} from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class AuthService {
  private readonly AUTH_URL = 'https://auth.staging.ultra.io/auth/realms/ultraio/protocol/openid-connect/token'
  private readonly CLIENT_ID = process.env.ULTRA_CLIENT_ID
  private readonly CLIENT_SECRET = process.env.ULTRA_CLIENT_SECRET
  private readonly REDIRECT_URI = process.env.ULTRA_REDIRECT_URI

  async getUltraToken() {
    try {
      const response = await axios.post(
        this.AUTH_URL,
        {
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET,
          grant_type: 'client_credentials',
          redirect_uri: this.REDIRECT_URI,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error('Error getting Ultra token:', error)
      throw error
    }
  }
}