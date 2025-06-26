import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { MdDelete } from "react-icons/md";
import { BsPinAngle } from "react-icons/bs";
import { MdColorLens } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import PrimaryButton from "./Components/PrimaryButton";
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
    const [input, setInput] = useState("")
    const [noteDesc, setNoteDesc] = useState("")
    const [quote, setQuote] = useState("")
    const [todos, setTodos] = useState([])
    const [taskStatus, setTaskStatus] = useState(false)
    const [spinner, setSpinner] = useState(false)

    // Get Random Quote
    useEffect(() => {
        // setSpinner(true)
        // fetch('https://dummyjson.com/quotes/random')
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setQuote(data)
        //         setSpinner(false)
        //     })
        //     .catch((err) => console.error("Failed to fetch quote:", err));

        let allTodos = JSON.parse(localStorage.getItem("Todos")) || []
        setTodos(allTodos)
    }, []);

    // Handle Todo Task Input
    const handleInput = (e) => {
        setInput(e.target.value)
    }

    // Handle Todo Task Input
    const handleNoteDesc = (e) => {
        setNoteDesc(e.target.value)
    }

    // Handle Adding Notes
    const handleAddTodo = () => {
        if (input.trim() === "" || noteDesc.trim() === "") {
            toast.error("Please enter someting!");
            return
        }
        else {
            const colors = ["#FB2C36", "#FDC700", "#FF770F", "#0FFFCF", "#04FF00", "#00BFFF", "#FF00FF", "#9400D3", "#FF1493", "#00FF7F", "#1E90FF", "#FF4500", "#7CFC00", "#FFD700", "#FF69B4", "#00CED1", "#DC143C", "#32CD32", "#8A2BE2", "#FF6347", "#00FA9A", "#BA55D3", "#40E0D0", "#DAA520", "#FF8C00"];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            const newTodo = {
                id: Date.now(),
                title: input,
                description: noteDesc,
                color: randomColor,
                date: new Date().toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                })
            }

            setTodos([newTodo, ...todos])
            localStorage.setItem("Todos", JSON.stringify([newTodo, ...todos]))
            setInput("")
            setNoteDesc("")
        }
        document.getElementById("crud-modal")?.classList.add("hidden");
        document.querySelector('[class*="bg-gray-900"][class*="fixed"][class*="z-40"]')?.remove();
        toast.success("Note saved!");
    }

    // Deleting All Notes
    const deleteAllTodos = () => {
        localStorage.clear()
        setTodos([])
        toast.success("All notes deleted!");
    }

    return (
        <>
            <Navbar />
            <section section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-4">
                        <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-[2px_2px_0_rgb(220,167,0)]">Your Daily Notes</h1>

                        <span className="flex items-center justify-center py-4">
                            {spinner ? (<span><img src="./src/assets/spinner.gif" alt="Spinner" width={100} /></span>) : (<blockquote className="text-center mb-6 text-gray-500 quote">&ldquo;{quote.quote}&rdquo; &mdash; <footer className="author">{quote.author}</footer>
                            </blockquote>)}
                        </span>
                    </div>
                    <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">

                        <input id="model-trigger" data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="w-full bg-opacity-50 rounded border border-gray-300 text-base outline-none px-4 p-3 leading-8 transition-colors duration-200 ease-in-out cursor-pointer shadow-md" placeholder="Enter a task..." readOnly />

                        {/* <!-- Main modal --> */}
                        <div id="crud-modal" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div className="relative p-4 w-full max-w-md max-h-full">
                                {/* <!-- Modal content --> */}
                                <div className="relative bg-white rounded-lg shadow-sm">
                                    {/* <!-- Modal header --> */}
                                    <div className="flex items-center justify-between p-4 md:p-5 rounded-t border-gray-300">
                                        <h3 className="text-lg font-semibold text-gray-900 ">
                                            What’s on Your Mind?
                                        </h3>
                                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer" data-modal-toggle="crud-modal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    {/* <!-- Modal body --> */}
                                    <div className="p-4 md:p-5">
                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                            <div className="col-span-2">
                                                <div className="relative flex-grow w-full">

                                                    <input type="text" id="full-name" name="full-name" className="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-transparent focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 mb-4 leading-8 transition-colors duration-200 ease-in-out shadow" placeholder="Enter a note..." value={input} onChange={handleInput} />

                                                    <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:border-yellow-500 focus:bg-transparent focus:ring-2 focus:ring-yellow-200 mb-4 shadow" onChange={handleNoteDesc} value={noteDesc} placeholder="Write note description..."></textarea>

                                                    <button onClick={handleAddTodo} className="flex mx-auto text-white bg-yellow-400 border-0 my-2 py-1 px-4 focus:outline-none hover:bg-yellow-600 rounded text-lg cursor-pointer drop-shadow-[2px_2px_0_rgb(220,167,0)] w-fit">Create Note</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Model ends */}
                    </div>
                    {todos.length > 0 && (<button className="text-red-600 hover:text-red-700 underline focus:outline-none text-lg cursor-pointer" onClick={deleteAllTodos}>Delete All Todos</button>)}
                </div>
            </section>

            <section className="text-gray-600 body-font h-100">

                <div className="lg:w-2/3 w-full container px-5 py-5 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {todos <= 0 && (<span id="empty-message" className="w-full flex text-center justify-center items-center flex-col  gap-4">
                            <img src="./src/assets/light-bulb.svg" alt="No Notes Png" className="light_bulb mx-auto opacity-35 pointer-events-none select-none" width={120} />
                            <p className="text-gray-400">Notes that you add appear here!</p>
                        </span>)}
                        {todos.map(todo => {
                            return (
                                <div key={todo.id} className="p-2 lg:w-1/4 group">
                                    <div className="h-full border border-gray-300 bg-opacity-75 rounded-lg overflow-hidden text-center relative hover:shadow-lg">
                                        <div className="w-full flex items-center justify-end h-2 mb-4" style={{ backgroundColor: todo.color }}>
                                        </div>
                                        <h2 className="title-font sm:text-2xl text-xl text-gray-700 mb-3">{todo.title}</h2>
                                        <p className="leading-relaxed mb-3">{todo.description}</p>
                                        <p className="leading-relaxed mb-3 text-gray-400">{todo.date}</p>
                                        <div className="relative flex items-center justify-between px-4 py-2 ">
                                            {/* Left side: Delete icon */}
                                            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <span className="p-2 hover:bg-gray-300 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <MdDelete className="w-5 h-5 text-gray-800 hover:text-red-600" />
                                                </span>
                                                <span className="p-2 hover:bg-gray-300 rounded-full cursor-pointer">
                                                    <MdColorLens className="block w-5 h-5 text-gray-800" />
                                                </span>
                                            </div>

                                            {/* Right side: Color & Pin icons */}
                                            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <span className="p-2 hover:bg-gray-300 rounded-full cursor-pointer">
                                                    <MdEdit className="w-5 h-5 text-gray-800" />
                                                </span>
                                                <span className="p-2 hover:bg-gray-300 rounded-full cursor-pointer">
                                                    <BsPinAngle className="w-5 h-5 text-gray-800" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            <ToastContainer />
            <Footer />
        </>
    )
}

export default App;