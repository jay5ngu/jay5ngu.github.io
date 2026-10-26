// Defines the type of data that the ErrorScreen component can receive (component can receive an optional prop called onRetry)
interface ErrorScreenProps {
  errorMessage: string; // errorMessage is a string
  onRetry?: () => void; // onRetry must be a function that takes no arguments and returns nothing
 
}

export default function ErrorScreen({ errorMessage, onRetry, }: ErrorScreenProps) {
  return (
    <div className="stateScreen">
      <h2>Couldn't reach the archive</h2>
      <p>{errorMessage}. Check your connection and try again.</p>
      {onRetry && (
        <button className="addShowButton" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}