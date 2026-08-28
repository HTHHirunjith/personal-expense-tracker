import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { jwtDecode } from 'jwt-decode'
import { useApiClient } from '../hooks/useApiClient'

interface Profile {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: Date
  updatedAt: Date
}

const ProfilePage: React.FC = () => {
  const token = localStorage.getItem('token')
  const decodedToken = token ? jwtDecode(token) : null
  const [profile, setProfile] = useState<Profile | null>(null)
  const { get } = useApiClient()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await get(`/users/${decodedToken?.sub}/me`)
        if (response.data) {
          setProfile(response.data as Profile)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <div className='w-[75%] h-full m-4 p-10 bg-white rounded-2xl'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <p className='font-semibold text-sm text-gray-600'>First Name</p>
            <p className='font-light text-sm'>{profile?.firstName}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-semibold text-sm text-gray-600'>Last Name</p>
            <p className='font-light text-sm'>{profile?.lastName}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-semibold text-sm text-gray-600'>Email</p>
            <p className='font-light text-sm'>{profile?.email}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-semibold text-sm text-gray-600'>Profile Active since</p>
            <p className='font-light text-sm'>{new Date(profile?.createdAt ?? '').toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProfilePage