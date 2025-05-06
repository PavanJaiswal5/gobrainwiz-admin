import React from 'react'
import Navigation from '../components/Navigation'

function Courses() {
  return (
    <div>
          <Navigation items={[{ label: "Courses", endpoint: "/account/courses" },{ label: "Colleges", endpoint: "/account/colleges" }, { label: "Students", endpoint: "/account/students" }]} />
    </div>
  )
}

export default Courses