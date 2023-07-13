import { Button, Card, Typography } from '@material-tailwind/react'
import { SearchField } from '../Shared/StyledComponents'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import AuthProvider, { AuthContext } from '../../contexts/AuthProvider'
import { useContext, useEffect, useRef, useState, useMemo } from 'react'
import { OtherContext, order_status_translations, default_order_types } from "../../contexts/OtherContexts";
export default function NewOrders({ orderList, handleOpenAddUpdates, refetchData }) {
  const { userID, authKey, loggedUser } = useContext(AuthContext)
  const [usersList, setUsersList] = useState([])
  const { searchQuery, setSearchQuery } = useContext(OtherContext);



  const fetchData = async () => {
    axios
      .get(
        backendURL+'/user/all',
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
      const res = await axios
        .post(backendURL+'/order_status/assign', formData, {
          headers,
        })
        .then((res) => {
          
          refetchData()
        })
        .catch((err) => {
          console.log(err)
        })
      // console.log(res.data)
      Swal.fire(`${usersList[selectedValue].username} : لقد حددت`)
    }
  }

  const TABLE_HEAD = [
    {
      arabic: '',
    },
    {
      arabic: 'الملاحظات',
      english: 'Notes',
    },
    {
      arabic: 'الموظف',
      english: 'emp_name',
      options: usersList?.map((user) => { return user.username }),
      label: 'الموظف',
    },

    {
      arabic: 'حالة الطلب',
      english: 'status',
      options: [
        "معلق",
        "ملغي",
        "منجز جزئياً",
        "منجز",
        "قيد التنفيذ",
        "متأخر",
      ],
      label: 'حالة الطلب',
    },
    {
      arabic: '%',
      english: 'completed_percentage',
    },
    // {
    //   arabic: 'تاريخ إعادة المعالجة',
    // },
    {
      arabic: 'الراتب',
      english: 'customer_salary_amount',
    },
    {
      arabic: 'رقم الجوال',
      english: 'customer_phone',
    },
    {
      arabic: 'العميل',
      english: 'customer_name',
    },
    {
      arabic: 'نوع الطلب',
      english: 'order_type',
      options: default_order_types,
      label: 'نوع الطلب'
    },
    {
      arabic: 'رقم الطلب',
      english: 'id',
    },
  ]

  const EMPLOYEE_TABLE_HEAD = [
    {
      arabic: '',
    },
    {
      arabic: 'الملاحظات',
      english: 'Notes',
    },
    // {
    //   arabic: 'الموظف',
    //   english: 'emp_name',
    //   options: usersList.map((user) => { return user.username }),
    //   label : 'الموظف',
    // },

    {
      arabic: 'حالة الطلب',
      english: 'status',
      options: [
        "معلق",
        "ملغي",
        "منجز جزئياً",
        "منجز",
        "قيد التنفيذ",
        "متأخر",
      ],
      label: 'حالة الطلب',
    },
    {
      arabic: '%',
      english: 'completed_percentage',
    },
    // {
    //   arabic: 'تاريخ إعادة المعالجة',
    // },
    {
      arabic: 'الراتب',
      english: 'customer_salary_amount',
    },
    {
      arabic: 'رقم الجوال',
      english: 'customer_phone',
    },
    {
      arabic: 'العميل',
      english: 'customer_name',
    },
    {
      arabic: 'نوع الطلب',
      english: 'order_type',
      options: default_order_types,
      label: 'نوع الطلب'
    },
    {
      arabic: 'رقم الطلب',
      english: 'id',
    },
  ]

  const TABLE_ROWS = orderList

  const navigate = useNavigate()
  const navigateToRow = (id) => {
    navigate(`/dashboard/new_order?order_id=${id}`)
  }
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (field, key, value) => {
    // if (field.value === '') {
    const newSearchQuery = { ...searchQuery };
    if (field.id) {
      if (field.value === 'الكل')
        return;
      newSearchQuery[field.id] = field.value;
      // console.log(key,value,'safsadfasd')
    }
    else {
      if (value === 'الكل')
        return;
      console.log(key, value, 'safsadfasd')
      newSearchQuery[key] = value;
    }
    setSearchQuery(newSearchQuery);
    console.log(searchQuery);
    // }
  };

  const filteredRows = orderList.filter((row) => {
    const searchableFields = [
      row.customer_name,
      row.order_type,
    ];

    // Additional check for the "status" field
    if (row.status) {
      searchableFields.push(order_status_translations[row.status]);
    }

    // Additional check for the "emp" field
    if (row.emp) {
      searchableFields.push(row.emp.username);
    }

    return searchableFields.some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <Card className='overflow-auto h-full w-full'>
      <table className='w-full min-w-max table-auto text-left' style={
        {
          borderColor: 'rgb(33 150 243 / var(--tw-bg-opacity))',
          borderBottomWidth: '20px',
        }
      }>
        <thead style={{ background: 'rgb(33 150 243 / var(--tw-bg-opacity))', borderColor: 'rgb(33 150 243 / var(--tw-bg-opacity))' }}>
          <tr style={{ background: 'rgb(33 150 243 / var(--tw-bg-opacity))' }}>
            {(loggedUser === 1 || loggedUser === 2 ? TABLE_HEAD : EMPLOYEE_TABLE_HEAD).map((head, i) => (
              <th
                style={{ background: 'rgb(33 150 243 / var(--tw-bg-opacity))', color: 'white' }}
                key={i}
                className='border-b border-blue-gray-100 bg-blue-gray-50 p-3'>
                <div className='flex flex-col gap-2 ' >
                  <span>{head?.arabic}</span>
                  {/* <span>{head?.english}</span> */}
                </div>

              </th>
            ))}
          </tr>
          <tr style={{ background: 'rgb(33 150 243 / var(--tw-bg-opacity))' }}>
            {(loggedUser === 1 || loggedUser === 2 ? TABLE_HEAD : EMPLOYEE_TABLE_HEAD).map((head, i) => (
              <th
                key={i}
                style={{ background: 'rgb(33 150 243 / var(--tw-bg-opacity))' }}
                className='border-b border-blue-gray-100 bg-blue-gray-50 p-3'>
                <div className='flex flex-col gap-2 '>
                  {(head?.arabic === 'الموظف' ||
                    head?.arabic === 'حالة الطلب' ||
                    head?.arabic === 'العميل' ||
                    head?.arabic === 'رقم الطلب' ||
                    head?.arabic === 'رقم الجوال' ||
                    head?.arabic === 'الراتب' ||
                    head?.arabic === 'نوع الطلب')
                    && <SearchField onSearch={handleSearch} id={head?.english} value={searchQuery[head?.english]} options={head?.options} label={head?.label} />}
                </div>

              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows.map(
            (
              {
                last_update_note,
                customer_name,
                status,
                completed_percentage,
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
                        {emp.username || 'تعيين'}
                      </Typography>
                    </td>
                  )}
                  {(loggedUser === 1 || loggedUser === 2) ? (
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
                  ) : (<td className={classes}>


                    {order_status_translations[status]}


                  </td>)}
                  <td className={classes}>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'>
                      {

                        completed_percentage.toFixed(2) + '%'
                      }
                    </Typography>
                  </td>
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
