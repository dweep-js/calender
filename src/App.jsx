import Calendar from "./components/Calender";

function App() {

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Add 1 as months are zero-based
  const year = currentDate.getFullYear()

  return (
    <>
    <div className="date-container">
        <h1>{day}-{month}-{year}</h1>
    </div>
    <Calendar />
    </>


  )
}

export default App
