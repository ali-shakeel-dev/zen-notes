
function PrimaryButton({ value, link = "#" }) {
  const isExternal = link && !link.startsWith("#");
  return (
    <div>
      <a href={link} className="flex mx-auto text-white bg-yellow-400 border-0 py-1 px-4 focus:outline-none hover:bg-yellow-600 rounded text-lg cursor-pointer drop-shadow-[2px_2px_0_rgb(220,167,0)] w-fit" {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{value}</a>
    </div>
  )
}

export default PrimaryButton
