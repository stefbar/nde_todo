import type { UserAttributes } from '@supabase/supabase-js'
import { useRef } from "react"
import { supabase } from '../db/supabaseClient'

const RecoverPassword = ({ token, setRecoveryToken }: { token: UserAttributes; setRecoveryToken: React.Dispatch<React.SetStateAction<string | null>> }) => {

    const newPasswordRef = useRef<HTMLInputElement>(null)

    const handleNewPassword = async () => {
        const newPassword = newPasswordRef?.current?.value
        const { error } = await supabase.auth.updateUser(token, {
            password: newPassword,
        })

        if (!error) {
            // To render our Todo list again
            setRecoveryToken(null)
        } else {
            console.error(error)
        }
    }

    return (
      <div>
        <span>
          Recover password
        </span>
        <label htmlFor={"email"}>
          <span>*</span>
          Enter new password :
        </label>
        <input
          type="password"
          ref={newPasswordRef}
          required
        />
        <span>
          <button
            onClick={handleNewPassword}
            type="button"
          >
            Change password
          </button>
        </span>
      </div>
    )

}

export default RecoverPassword