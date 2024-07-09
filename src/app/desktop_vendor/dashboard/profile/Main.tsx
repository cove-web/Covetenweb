'use client'
import Loading from '@/app/loading';
import Button from '@/components/Button';
import Error from '@/components/Error';
import AuthConfig from '@/firebase/oauth.config';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useMutation, useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import Industries from './Industries';
import Services from './Services';
import Documents from './Documents';
import toast from 'react-hot-toast';
import Tabs from './(components)/Tabs';
import { useAuth } from '@/firebase/AuthProvider';
import GeneralInfo from './(components)/GeneralInfo';
import { useRouter } from 'next/navigation';

const GET_USER = `query Query($where: UserWhere) {
    users(where: $where) {
      userId
      name
      email
      phone
      bio
      id
      panCardNo
      phoneNumber
      companyName
      companyEmail
      gstNumber
      title
      education
      department
      companyPhone
      linkedin
      twitter
      skypeId
      experience
      specialty
      companyDescription
      isProfileCompleted
      interest
      user_type
      hasDocuments {
        hasFiles {
          links
        }
      }
      hasPrimaryaddress {
        street
        city
        state
        Country
        zipCode
      }
      hasSecondaryaddress {
        id
        street
        city
        state
        Country
        zipCode
      }
      isVendor {
        id
        industry
        service
        equipmentDocs
        hasManyEquipment {
          id
          name
          model
          make
          yearOfInstallation
          calibrationDetails
          warranty
        }
      }
    }
  }`

const UPDATE_USER = `mutation UpdateUsers($where: UserWhere, $update: UserUpdateInput) {
  updateUsers(where: $where, update: $update) {
    info {
      nodesCreated
      nodesDeleted
    }
  }
}`

const Main = () => {



  //states
  const [previousData, setPreviousData] = React.useState<any>(null)
  const [userInfo, setUserInfo] = React.useState<any>({
    name: '',
    email: '',
    userId: '',
    phone: '',
    title: '',
    department: '',
    education: '',
    experience: '',
    specialty: '',
    interest: '',
    // reportingTo: '',
    bio: '',
    companyName: '',
    companyEmail: '',
    aboutCompany: '',
    companyPhone: '',
    panCardNo: '',
    gst: '',
    otherPhone: '',
    linkedin: '',
    twitter: '',
    skypeId: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    otherStreet: '',
    otherCity: '',
    userType: '',
    otherState: '',
    otherCountry: '',
    otherZip: '',
    documents: [],
    equipmentAttachments: [],
  })


  //hooks
  const client = useGqlClient()
  const { user, authLoading }: any = useAuth()
  const router = useRouter()





  // fetching data
  const [getUserFn, userState] = useManualQuery(GET_USER, {
    client,
  })

  // updating the user node
  const [updateUserFn, updateUserState] = useMutation(UPDATE_USER, { client })




  // setting the user data  to the state
  useEffect(() => {
    if (previousData) {
      const { isVendor, hasSecondaryaddress, hasPrimaryaddress, hasDocuments, user_type, interest, companyDescription, specialty, experience, skypeId, twitter, linkedin, companyPhone, department, education, title, gstNumber, companyEmail, reportingTo, companyName, phoneNumber, panCardNo, bio, phone, email, name, userId } = previousData






      const primaryStreet = hasPrimaryaddress?.street || ''
      const primaryCity = hasPrimaryaddress?.city || ''
      const primaryState = hasPrimaryaddress?.state || ''
      const primaryCountry = hasPrimaryaddress?.Country || ''
      const primaryZip = hasPrimaryaddress?.zipCode || ''

      const secondaryStreet = hasSecondaryaddress?.street || ''
      const secondaryCity = hasSecondaryaddress?.city || ''
      const secondaryState = hasSecondaryaddress?.state || ''
      const secondaryCountry = hasSecondaryaddress?.Country || ''
      const secondaryZip = hasSecondaryaddress?.zipCode || ''

      const service = isVendor?.service || []
      const industries = isVendor?.industry || []
      const equipments = isVendor?.hasManyEquipment || []
      const equipmentAttachments = isVendor?.equipmentDocs || []

      const documents = hasDocuments?.hasFiles?.links || []



      setUserInfo({
        name,
        userId,
        email,
        phone,
        title,
        department,
        education,
        experience,
        specialty,
        interest,
        // reportingTo,
        bio,
        companyName,
        companyEmail,
        aboutCompany: companyDescription,
        companyPhone,
        panCardNo,
        gst: gstNumber,
        otherPhone: phoneNumber,
        linkedin,
        twitter,
        skypeId,
        street: primaryStreet,
        city: primaryCity,
        state: primaryState,
        country: primaryCountry,
        zip: primaryZip,
        otherStreet: secondaryStreet,
        otherCity: secondaryCity,
        userType: user_type,
        otherState: secondaryState,
        otherCountry: secondaryCountry,
        otherZip: secondaryZip,
        documents,
        equipments,
        service,
        industries,
        equipmentAttachments,

      })
    }
  }, [previousData])




  useEffect(() => {
    if (user?.email) {
      getUser()
    }
  }, [user?.email, authLoading])



  // get user 
  const getUser = async () => {
    const { data } = await getUserFn({
      variables: { where: { email: user?.email || 'no user' } }
    })
    if (data?.users[0]?.name) {
      setPreviousData(data?.users[0])
    }
  }





  // updating the user node

  const updateUser = async (updatedData: any) => {

    const { name, email, phone, title, department, education, experience, specialty, interest, bio, companyName, companyEmail, aboutCompany, companyPhone, panCardNo, gst, otherPhone, linkedin, twitter, skypeId, otherZip, otherCountry, otherState, otherCity, otherStreet, zip, country, state, city, street } = updatedData

    let profileComplete = false

    if (name && email && phone && title && department && education && experience && specialty && interest && bio && companyName && companyEmail && aboutCompany && companyPhone && panCardNo && gst && otherPhone && linkedin && twitter && skypeId && otherZip && otherCountry && otherState && otherCity && otherStreet && zip && country && state && city && street) {
      profileComplete = true

    } else {
      profileComplete = false
    }

    if (!previousData.hasPrimaryaddress && !previousData.hasSecondaryaddress) {

      const { data } = await updateUserFn({
        variables: {
          "where": {
            "email": user?.email
          },
          "update": {
            "name": name,
            "email": email,
            "phone": phone,
            "bio": bio,
            "panCardNo": panCardNo,
            "phoneNumber": otherPhone,
            "companyName": companyName,
            "companyEmail": companyEmail,
            "gstNumber": gst,
            "title": title,
            "education": education,
            "department": department,
            "companyPhone": companyPhone,
            "linkedin": linkedin,
            "twitter": twitter,
            "skypeId": skypeId,
            "experience": experience,
            "specialty": specialty,
            "interest": interest,
            isProfileCompleted: profileComplete,
            "companyDescription": aboutCompany,

            "hasPrimaryaddress": {
              "create": {
                "node": {
                  "street": street,
                  "city": city,
                  "state": state,
                  "Country": country,
                  "zipCode": zip
                }
              }
            },
            "hasSecondaryaddress": {
              "create": {
                "node": {
                  "street": otherStreet,
                  "city": otherCity,
                  "state": otherState,
                  "Country": otherCountry,
                  "zipCode": otherZip
                }
              }
            }
          }
        }
      })


      if (data) {
        toast.success('User updated successfully')
        router.refresh()
        getUser()
      }
    } else {

      const { data } = await updateUserFn({
        variables: {
          "where": {
            "email": user?.email
          },
          "update": {
            "name": name,
            "email": email,
            "phone": phone,
            "bio": bio,
            "panCardNo": panCardNo,
            "phoneNumber": otherPhone,
            "companyName": companyName,
            "companyEmail": companyEmail,
            "gstNumber": gst,
            "title": title,
            "education": education,
            "department": department,
            "companyPhone": companyPhone,
            "linkedin": linkedin,
            "twitter": twitter,
            "skypeId": skypeId,
            "experience": experience,
            "specialty": specialty,
            "interest": interest,
            isProfileCompleted: profileComplete,
            "companyDescription": aboutCompany,

            "hasPrimaryaddress": {
              "update": {
                "node": {
                  "street": city,
                  "city": city,
                  "state": state,
                  "Country": country,
                  "zipCode": zip
                }
              }
            },
            "hasSecondaryaddress": {
              "update": {
                "node": {
                  "street": otherState,
                  "city": otherCity,
                  "state": otherState,
                  "Country": otherCountry,
                  "zipCode": otherZip
                }
              }
            }
          }
        }
      })


      if (data) {
        toast.success('User updated successfully')
        router.refresh()
        getUser()
      }
    }




  }





  if (updateUserState.loading || authLoading || userState.loading) return <div><Loading /></div>

  // if (userState.error || updateUserState.error) return <Error />

  return (
    <div className='bg-white p-4'>

      {
        user?.user_type === "LAB_ASSISTANT"
          ?
          <>
            <GeneralInfo updateUser={updateUser} userInfo={userInfo} setUserInfo={setUserInfo} />
          </>
          :
          <>
            <Tabs userInfo={userInfo} setUserInfo={setUserInfo} updateUser={updateUser} getUser={getUser} />
          </>
      }



    </div>
  );
};

export default Main;