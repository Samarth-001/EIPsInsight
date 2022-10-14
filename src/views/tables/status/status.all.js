/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHeaderCell,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { Link, NavLink } from 'react-router-dom'
import { CCard, CCardBody, CCardFooter, CCol, CRow } from '@coreui/react-pro'
import { Column, Pie, G2, Line, Area, Bar } from '@ant-design/plots'
import { each, groupBy } from '@antv/util'
import useMediaQuery from 'src/scss/useMediaQuery'

import '../type/type.css'

function statusAll(props) {
  const [post, getPost] = useState()
  const [date, setDate] = useState()

  const matches = useMediaQuery('(max-width: 600px)')

  const API = 'https://eipsinsight.com/api/statusPage'
  const fetchPost = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        getPost(res)
      })
  }
  const fetchAnnotations = (d) => {
    const annotations = []
    each(groupBy(d, 'type'), (values, k) => {
      const value = values.reduce((a, b) => a + b.value, 0)

      annotations.push({
        type: 'text',
        position: [k, value],
        content: `${value}`,
        style: {
          textAlign: 'center',
          fontSize: 12,
          fill: 'rgba(0,0,0,0.6)',
        },
        offsetY: -10,
      })
    })
    return annotations
  }
  const fetchDate = () => {
    let date = new Date().toDateString()
    setDate(date)
  }

  const fetchData = (data, name) => {
    let arr = []

    arr.push(
      {
        name: 'Core',
        value: data[name] === undefined ? 0 : data[name]['Standard_Track']['Core'],
        type: 'Standard Track',
      },
      {
        name: 'ERC',
        value: data[name] === undefined ? 0 : data[name]['Standard_Track']['ERC'],
        type: 'Standard Track',
      },
      {
        name: 'Networking',
        value: data[name] === undefined ? 0 : data[name]['Standard_Track']['Networking'],
        type: 'Standard Track',
      },
      {
        name: 'Interface',
        value: data[name] === undefined ? 0 : data[name]['Standard_Track']['Interface'],
        type: 'Standard Track',
      },
      {
        name: 'Meta',
        value: data[name] === undefined ? 0 : data[name]['Meta'],
        type: 'Meta',
      },
      {
        name: 'Informational',
        value: data[name] === undefined ? 0 : data[name]['Informational'],
        type: 'Informational',
      },
    )

    return arr
  }
  const fetchChartData = (name) => {
    const config = {
      data: fetchData(post === undefined ? [] : post, name),
      color: ['#228be6', '#66d9e8', '#ffa8a8', '#ffe066', '#e599f7', '#c0eb75'],
      isStack: true,
      xField: 'type',
      yField: 'value',
      seriesField: 'name',
      label: false,

      annotations: fetchAnnotations(fetchData(post === undefined ? [] : post, name)),
    }
    return config
  }

  const customTableChart = (name, title) => {
    return (
      <>
        <div
          style={{
            fontSize: '30px',
            fontWeight: '400',
            marginBottom: '00px',
            backgroundColor: 'white',
            border: 'none',

            padding: '15px',
            borderRadius: '5px',
            borderLeft: '4px solid #339af0',
            borderBottom: '2px solid #339af0',
            marginTop: '2rem',
            display: 'inline-block',
          }}
        >
          {title}{' '}
          <label
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            <Link
              to="/chartTable"
              style={{ textDecoration: 'none', color: 'inherit' }}
              state={{ type: '', status: name, category: '' }}
            >
              <div
                className='className="h-7
            shadow-2xl font-extrabold rounded-[8px] bg-[#e7f5ff] text-[#1c7ed6] text-[1.5rem] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out'
              >
                {post === undefined
                  ? 0
                  : post[name] === undefined
                  ? 0
                  : post[name]['Standard_Track']['Core'] +
                    post[name]['Standard_Track']['ERC'] +
                    post[name]['Standard_Track']['Networking'] +
                    post[name]['Standard_Track']['Interface'] +
                    post[name]['Meta'] +
                    post[name]['Informational']}
              </div>
            </Link>
          </label>
        </div>
        <CRow>
          <CCol xs={matches ? 12 : 6}>
            <CCard>
              <CCardBody
                style={{
                  height: '300px',
                  borderLeft: '2px solid #74c0fc',
                }}
              >
                <Column {...fetchChartData(name)} />
              </CCardBody>
              <CCardFooter
                className="cardFooter"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  borderLeft: '2px solid #74c0fc',
                  borderBottom: '2px solid #74c0fc',
                }}
              >
                <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
              </CCardFooter>
            </CCard>
          </CCol>
          <CCol xs={matches ? 12 : 6}>
            <CCard>
              <CCardBody
                style={{
                  overflowX: 'auto',
                  overflowY: 'auto',
                  height: '300px',
                  fontFamily: 'Roboto',
                  fontSize: '12px',
                  borderRight: '2px solid #74c0fc',
                }}
                className="scrollbarDesign"
              >
                <CTable>
                  <CTableHead style={{ borderBottom: '2px solid #4dabf7' }}>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                      <CTableHeaderCell scope="col">no. of EIPs</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow>
                      <CTableHeaderCell scope="row">
                        <NavLink
                          to="/chartTable"
                          state={{ type: 'Standards Track', status: name, category: '' }}
                        >
                          <label
                            className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out"
                          >
                            Standard Track{' '}
                          </label>
                        </NavLink>
                      </CTableHeaderCell>{' '}
                      <CTableDataCell>
                        <NavLink
                          to="/chartTable"
                          state={{ type: 'Standards Track', status: name, category: 'Core' }}
                        >
                          <label
                            className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out"
                          >
                            Core
                          </label>
                        </NavLink>
                      </CTableDataCell>
                      <CTableDataCell>
                        {post === undefined
                          ? 0
                          : post[name] === undefined
                          ? 0
                          : post[name]['Standard_Track']['Core']}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row"></CTableHeaderCell>
                      <CTableDataCell>
                        <NavLink
                          to="/chartTable"
                          state={{ type: 'Standards Track', status: name, category: 'ERC' }}
                        >
                          <label
                            className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out"
                          >
                            ERC
                          </label>
                        </NavLink>
                      </CTableDataCell>
                      <CTableDataCell>
                        {post === undefined
                          ? 0
                          : post[name] === undefined
                          ? 0
                          : post[name]['Standard_Track']['ERC']}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row"></CTableHeaderCell>
                      <CTableDataCell>
                        <NavLink
                          to="/chartTable"
                          state={{ type: 'Standards Track', status: name, category: 'Networking' }}
                        >
                          <label
                            className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out"
                          >
                            Networking
                          </label>
                        </NavLink>
                      </CTableDataCell>
                      <CTableDataCell>
                        {post === undefined
                          ? 0
                          : post[name] === undefined
                          ? 0
                          : post[name]['Standard_Track']['Networking']}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row"></CTableHeaderCell>
                      <CTableDataCell>
                        <NavLink
                          to="/chartTable"
                          state={{ type: 'Standard_Track', status: name, category: 'Interface' }}
                        >
                          <label
                            className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out"
                          >
                            Interface
                          </label>
                        </NavLink>
                      </CTableDataCell>
                      <CTableDataCell>
                        {post === undefined
                          ? 0
                          : post[name] === undefined
                          ? 0
                          : post[name]['Standard_Track']['Interface']}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row">
                        <NavLink
                          to="/chartTable"
                          state={{ type: 'Meta', status: name, category: '' }}
                        >
                          <label
                            className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out"
                          >
                            Meta
                          </label>
                        </NavLink>
                      </CTableHeaderCell>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell>
                        {post === undefined ? 0 : post[name] === undefined ? 0 : post[name]['Meta']}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row">
                        <NavLink
                          to="/chartTable"
                          state={{ type: 'Informational', status: name, category: '' }}
                        >
                          <label
                            className="h-7
            shadow-2xl font-extrabold rounded-[8px] hover:bg-[#e7f5ff] hover:text-[#1c7ed6] text-[12px] inline-block p-[4px] drop-shadow-sm cursor-pointer transition duration-700 ease-in-out"
                          >
                            Informational
                          </label>
                        </NavLink>
                      </CTableHeaderCell>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell>
                        {post === undefined
                          ? 0
                          : post[name] === undefined
                          ? 0
                          : post[name]['Informational']}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row" style={{ color: '#1c7ed6', fontSize: '15px' }}>
                        Total
                      </CTableHeaderCell>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell
                        style={{
                          fontWeight: '800',
                          fontSize: '15px',
                          display: 'inline-block',
                          borderRadius: '12px',
                          color: '#1c7ed6',
                          background: '#e7f5ff',
                        }}
                      >
                        {post === undefined
                          ? 0
                          : post[name] === undefined
                          ? 0
                          : post[name]['Standard_Track']['Core'] +
                            post[name]['Standard_Track']['ERC'] +
                            post[name]['Standard_Track']['Networking'] +
                            post[name]['Standard_Track']['Interface'] +
                            post[name]['Meta'] +
                            post[name]['Informational']}
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCardBody>
              <CCardFooter
                className="cardFooter"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  borderRight: '2px solid #74c0fc',
                  borderBottom: '2px solid #74c0fc',
                }}
              >
                <label style={{ color: 'grey', fontSize: '10px' }}>{date}</label>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }

  useEffect(() => {
    fetchPost()
    fetchDate()
  }, [])

  return (
    <>
      {customTableChart('Living', 'Living')}
      {customTableChart('Final', 'Final')}
      {customTableChart('Last_Call', 'Last Call')}
      {customTableChart('Review', 'Review')}
      {customTableChart('Draft', 'Draft')}
      {customTableChart('Stagnant', 'Stagnant')}
      {customTableChart('Withdrawn', 'Withdrawn')}
    </>
  )
}

export default statusAll