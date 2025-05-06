import React from 'react'
import data from '../Data'
import Filters from '../components/Filters'
function Dashboard() {
  return (
    <div>
      <div className="container max-w-[1280px] mx-auto">
        <div className="flex-col flex md:flex-row md:items-center mb-[20px] gap-[10px]">
          <div className="flex-auto">
            <div className="text-[20px] font-bold">Dashboard</div>
            <div className="text-[12px] font-normal text-gray-400">1st May 2025 to 31st May 2025</div>
          </div>
          <div className="flex items-center gap-[10px]">
            <Filters onApply={() => console.log("filters apply!")}>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Field One</label>
                      <select className="form-select form-select-sm">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Field One</label>
                      <input className="form-control form-control-sm" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Field One</label>
                      <input className="form-control form-control-sm" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Field One</label>
                      <select className="form-select form-select-sm">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </Filters>
          </div>
        </div>
        <div className="bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 text-white rounded-lg mb-[20px] flex-col md:flex-row flex md:items-center ">
          <div className="p-[20px] md:p-[30px] flex-auto">
            <div className="text-[24px] md:text-[35px] font-bold">Hello, Pavan Jaiswal </div>
            <div className="text-[14px] md:text-[16px]">Welcome back to BRAINWIZ</div>
          </div>
          <img src={`${import.meta.env.BASE_URL}/images/dashboard.png`} className="w-[120px] md:w-[200px] self-end -mt-[60px] md:-mt-[15px] md:mr-[6%]" />
        </div>
        <div className="grid gap-[20px] sm:grid-cols-2 md:grid-cols-3 [&>div:nth-child(1)]:bg-red-400  [&>div:nth-child(2)]:bg-blue-400 [&>div:nth-child(3)]:bg-green-400 [&>div:nth-child(4)]:bg-amber-400 [&>div:nth-child(5)]:bg-teal-400 [&>div:nth-child(6)]:bg-purple-400 [&>div:nth-child(7)]:bg-orange-400 [&>div:nth-child(8)]:bg-indigo-400">
          {
            data.dashboard.map((item, i) => <div key={i} className="relative flex flex-col gap-[40px] p-[20px] rounded-lg bg-gray-400 text-white">
              <div className="flex gap-[20px] border-0 border-b border-solid border-white/20 pb-[10px]">
                <i className={`text-[30px] ${item.icon}`}></i>
                <strong className="text-[20px]">{item.label}</strong></div>
              <div className="mt-auto">
                <h1 className="text-[25px] font-bold text-[30px] m-0">{item.value}</h1>
                <small className="text-[14px] opacity-70">{item.label}</small>
              </div>
              <i className={`absolute bottom-[10px] right-[10px] text-[120px] leading-[0px] bg-clip-text text-transparent bg-gradient-to-b from-white/30 to-transparent ${item.icon}`}></i>
            </div>)
          }
        </div>
      </div>
    </div>
  )
}
export default Dashboard