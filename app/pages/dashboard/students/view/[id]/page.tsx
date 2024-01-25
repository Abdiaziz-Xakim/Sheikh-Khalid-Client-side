"use client"

import StudentViewPage from "@/app/components/students/view/StudentViewPage"

// ** Demo Components Imports

const UserView = ({ params }: any) => {
  return <StudentViewPage id={params.id} />
}

export default UserView