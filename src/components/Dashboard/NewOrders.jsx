import { Button, Card, Typography } from "@material-tailwind/react";
import Container from "../widgets/Container";
import { SearchField } from "../Shared/StyledComponents";
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import axios from "axios";
import Swal from 'sweetalert2'
import { AuthContext } from '../../contexts/AuthProvider'
export default function NewOrders({ newOrders, handleOpenAddUpdates, refetchData }) {
    const { userID, authKey, loggedUser } = useContext(AuthContext)
    const [usersList, setUsersList] = useState([])
    const order_status_translations = {
      PENDING: 'معلق',
      CANCELLED: 'ملغى',
      PARTIALLY_COMPLETED: 'منجز جزئياً',
      COMPLETED: 'منجز',
      ON_PROGRESS: 'قيد التنفيذ',
      DELAYED: 'متأخر',
    }
  
    const fetchData = async () => {
      axios
        .get(
          'https://miftahaldaar.ratina.co/user/all',
  
          { headers }
        )
        .then((res) => {
          setUsersList(res.data.users)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    useEffect(() => {
      fetchData()
    }, [])
  
    const filterUsers = (id) => {
      return usersList?.filter((user) => user.id === id)[0].username
    }
  
    const headers = {
      'user-id': userID,
      'auth-key': authKey,
    }
    const handleAssign = async (order_id) => {
      const { value: selectedValue } = await Swal.fire({
        title: 'تعيين موظف',
        input: 'select',
        inputOptions: {
          المستخدمون: usersList.map((user) => {
            return user.username
          }),
        },
        inputPlaceholder: 'اختر موظف',
        showCancelButton: true,
        confirmButtonText: 'تعيين',
        cancelButtonText: 'إغلاق',
      })
  
      if (selectedValue) {
        const formData = new FormData()
        formData.append('order_id', order_id)
        formData.append('emp_id', usersList[selectedValue].id)
        await axios
          .post('https://miftahaldaar.ratina.co/order_status/assign', formData, {
            headers,
          })
          .then((res) => {
            refetchData()
          })
          .catch((err) => {
            console.log(err)
          })
        Swal.fire(`${usersList[selectedValue].username} : لقد حددت`)
      }
    }
  
    const TABLE_HEAD = [
      {
        arabic: '',
      },
      {
        arabic: 'الملاحظات',
      },
      {
        arabic: 'الموظف',
      },
      {
        arabic: 'حالة الطلب',
      },
    //   {
    //     arabic: 'تاريخ إعادة المعالجة',
    //   },
      {
        arabic: 'الراتب',
      },
      {
        arabic: 'رقم الجوال',
      },
      {
        arabic: 'العميل',
      },
      {
        arabic: 'نوع الطلب',
      },
      {
        arabic: 'رقم الطلب',
      },
    ]
  
    const EMPLOYEE_TABLE_HEAD = [
      {
        arabic: '',
      },
      {
        arabic: 'الملاحظات',
      },
      {
        arabic: 'تاريخ إعادة المعالجة',
      },
      {
        arabic: 'الراتب',
      },
      {
        arabic: 'رقم الجوال',
      },
      {
        arabic: 'العميل',
      },
      {
        arabic: 'نوع الطلب',
      },
      {
        arabic: 'بطاقة تعريف',
      },
    ]
  
    const TABLE_ROWS = newOrders
  
    const navigate = useNavigate()
    const navigateToRow = (id) => {
      navigate(`/dashboard/new_order?order_id=${id}`)
    }
  
    return (
      <Card className='overflow-auto h-full w-full'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {(loggedUser === 1 || loggedUser === 2 ? TABLE_HEAD : EMPLOYEE_TABLE_HEAD).map((head, i) => (
                <th
                  key={i}
                  className='border-b border-blue-gray-100 bg-blue-gray-50 p-3'>
                  <div className='flex flex-col gap-2 '>
                    <span>{head?.arabic}</span>
                    <span>{head?.english}</span>
                  </div>
                  {(head?.arabic === 'الموظف' ||
                    head?.arabic === 'حالة الطلب' ||
                    head?.arabic === 'العميل' ||
                    head?.arabic === 'نوع الطلب') && <SearchField />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              (
                {
                  last_update_note,
                  customer_name,
                  status,
                  // date_of_reprocessing = "لا يوجد",
                  date_of_reprocessing = '',
                  customer_salary_amount,
                  customer_phone,
                  order_type,
                  id,
                  emp,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50'
                //   {(loggedUser === 1 || loggedUser === 2) && (
                return (
                  <tr
                    key={index}
                    onClick={(event) => {
                      if (!event.target.classList.contains('no-click')) {
                        navigateToRow(id)
                      }
                    }}
                    className='hover:bg-gray-100 cursor-pointer'>
                    <td className={classes}>
                      <Button
                        onClick={() => handleOpenAddUpdates(id)}
                        color='green'
                        className='flex items-center gap-3 float-right no-click'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6 no-click'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        إضافة التحديث
                      </Button>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'>
                        {last_update_note}
                      </Typography>
                    </td>
                    {(loggedUser === 1 || loggedUser === 2) && (
                      <td className={classes}>
                        <Typography
                          onClick={() => handleAssign(id)}
                          variant='small'
                          color='blue-gray'
                          className='font-normal bg-blue-400 p-2 text-center rounded-lg text-white hover:bg-blue-500 cursor-pointer no-click'>
                          {emp.username}
                        </Typography>
                      </td>
                    )}
                    {(loggedUser === 1 || loggedUser === 2) && (
                      <td className={classes}>
                        <Link
                          to={`/dashboard/new_order?order_id=${id}`}
                          key={index}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal text-white bg-orange-400 p-2 text-center rounded-lg no-click'>
                            {order_status_translations[status]}
                          </Typography>
                        </Link>
                      </td>
                    )}
                    {/* <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'>
                        {date_of_reprocessing}
                      </Typography>
                    </td> */}
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'>
                        {customer_salary_amount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'>
                        {customer_phone}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'>
                        {customer_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'>
                        {order_type}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'>
                        {id}
                      </Typography>
                    </td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      </Card>
    )
  }
  
