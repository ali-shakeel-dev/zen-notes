import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { MdDelete } from "react-icons/md";
import { BsPinAngle } from "react-icons/bs";
import { MdColorLens } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
    const [input, setInput] = useState("")
    const [noteDesc, setNoteDesc] = useState("")
    const [quote, setQuote] = useState("")
    const [todos, setTodos] = useState([])
    const [taskStatus, setTaskStatus] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [activeNoteId, setActiveNoteId] = useState(null);
    const [showColorModal, setShowColorModal] = useState(false);

    const colors = ["#FB2C36", "#FDC700", "#FF770F", "#0FFFCF", "#04FF00", "#00BFFF", "#FF00FF", "#9400D3", "#FF1493", "#00FF7F", "#1E90FF", "#FF4500", "#7CFC00", "#FFD700", "#FF69B4", "#00CED1", "#DC143C", "#32CD32", "#8A2BE2", "#FF6347", "#00FA9A", "#BA55D3", "#40E0D0", "#DAA520", "#FF8C00"];

    useEffect(() => {
        const modal = document.getElementById("crud-modal");

        const resetModalState = () => {
            setInput("");
            setNoteDesc("");
            setIsEditing(false);
            setEditId(null);
        };

        // Flowbite uses "hidden.bs.modal" but for CDN-based modal, it just toggles classes
        const observer = new MutationObserver(() => {
            if (modal?.classList.contains("hidden")) {
                resetModalState();
            }
        });

        if (modal) {
            observer.observe(modal, { attributes: true, attributeFilter: ["class"] });
        }

        return () => observer.disconnect();
    }, []);


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
        if (isEditing === true) {
            const updatedNotes = todos.map((todo) => {
                return todo.id === editId ? { ...todo, title: input, description: noteDesc, color: todo.color, date: todo.date, id: todo.id } : todo
            })

            setTodos(updatedNotes)
            localStorage.setItem("Todos", JSON.stringify(updatedNotes))
            toast.success("Note updated!");
            setInput("")
            setNoteDesc("")
            setIsEditing(false);
            setEditId(null);
        } else {
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
            toast.success("Note saved!");
        }
        setInput("")
        setNoteDesc("")
        document
            .querySelector('#crud-modal [data-modal-toggle="crud-modal"]')
            ?.click();
    }

    // Handle Edit Note
    const handleEditNote = (todo) => {
        setIsEditing(true)
        setEditId(todo.id)
        setInput(todo.title)
        setNoteDesc(todo.description)
        document.getElementById("model-trigger")?.click();
        document
            .querySelector('#color-modal [data-modal-toggle="color-modal"]')
            ?.click();
    }

    // Handle Delete Specific Note
    const handleDeleteNote = (todo) => {
        const updateNotes = todos.filter((note) => note.id !== todo.id)
        setTodos(updateNotes)
        localStorage.setItem("Todos", JSON.stringify(updateNotes))
        toast.success("Note deleted!");
    }

    // Handle Change Color
    const handleChangeColor = (todo) => {
        setActiveNoteId(todo.id)
        setShowColorModal(true);
    }

    // Catch what color user selects
    const handleModalNotesColor = (selectedNoteColor) => {
        const updatedNotes = todos.map((todo) => {
            return todo.id === activeNoteId ? { ...todo, color: selectedNoteColor } : todo
        })
        setTodos(updatedNotes)
        localStorage.setItem("Todos", JSON.stringify(updatedNotes))
        setShowColorModal(false);
        toast.success("Note color changed!");
        setActiveNoteId(null); // reset
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

                                                    <button onClick={handleAddTodo} className="flex mx-auto text-white bg-yellow-400 border-0 my-2 py-1 px-4 focus:outline-none hover:bg-yellow-600 rounded text-lg cursor-pointer drop-shadow-[2px_2px_0_rgb(220,167,0)] w-fit">{isEditing ? "Update Note" : "Create Note"}</button>

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

            <section className="text-gray-600 body-font min-h-100">
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
                                                <span onClick={() => handleDeleteNote(todo)} className="p-2 hover:bg-gray-300 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <MdDelete className="w-5 h-5 text-gray-800 hover:text-red-600" />
                                                </span>
                                                <span
                                                    onClick={() => handleChangeColor(todo)}
                                                    className="p-2 hover:bg-gray-300 rounded-full cursor-pointer"
                                                >
                                                    <MdColorLens className="w-5 h-5 text-gray-800" />
                                                </span>
                                            </div>

                                            {showColorModal && (
                                                <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-full bg-gray-600/20
 flex justify-center items-center">
                                                    <div className="bg-white rounded-lg shadow w-full max-w-md">
                                                        <div className="flex items-start justify-between p-4 border-b rounded-t">
                                                            <h3 className="text-xl font-semibold">Change the Color</h3>
                                                            <button
                                                                onClick={() => setShowColorModal(false)}
                                                                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                        <div className="p-6 flex flex-wrap gap-3">
                                                            {colors.map((color, index) => (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => handleModalNotesColor(color)}
                                                                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-black cursor-pointer"
                                                                    style={{ backgroundColor: color }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}


                                            {/* Right side: Color & Pin icons */}
                                            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <span onClick={() => { handleEditNote(todo) }} className="p-2 hover:bg-gray-300 rounded-full cursor-pointer">
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
            <Footer />
            <ToastContainer />
        </>
    )
}

export default App;