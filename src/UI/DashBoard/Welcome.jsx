

const Welcome = ({workSpace,setScreen}) => {


  return (
    <div className="flex flex-col justify-center items-center h-[80vh] gap-24">
      <h1 className="text-2xl md:text-7xl font-semibold">Welcome to <span className="bg-black text-white p-4 rounded-md">{workSpace.workSpaceName}</span></h1>
      <div className="flex"> 
         <button onClick={()=>setScreen("projects")} className="w-32 h-14 bg-blue-600">Get</button>
      </div>
    </div>
  )
}

export default Welcome;