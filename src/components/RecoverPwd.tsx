import { useRef } from "react"
import { supabase } from '../supabaseClient'

const RecoverPassword = ({ token, setRecoveryToken }) => {
    const newPasswordRef = useRef()

    const handleNewPassword = async () => {
        const newPassword = newPasswordRef.current.value
        const { error } = await supabase.auth.api.updateUser(token, {
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
          <span className={"font-mono mr-1 text-red-400"}>*</span>
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