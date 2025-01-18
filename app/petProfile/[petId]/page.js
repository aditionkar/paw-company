import CreateProfile from '@/components/CreateProfile'
import ProfileCard from '@/components/ProfileCard'
import React from 'react'

function PetProfile() {
  return (
    <div >
      <p>Before creating a profile for pet :</p>
      <CreateProfile/>
      <p>After creating a profile for pet</p>
      <ProfileCard/>
    </div>
  )
}

export default PetProfile