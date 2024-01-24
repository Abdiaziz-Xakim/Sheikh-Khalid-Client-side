"use client"

// ** Demo Components Imports
import UserViewPage from '@/app/components/users/view/UserViewPage'

const UserView = ({ params }: any) => {
  return <UserViewPage id={params.id} />
}

export default UserView