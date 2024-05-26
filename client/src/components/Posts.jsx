import React, { useState } from 'react'
import '../styles/dashboard.css'
import Sidebar from './Sidebar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const Posts = () => {
    const [value, setValue] = useState('');
    return (
        <section className='admin_post'>
            <Sidebar />
            <ReactQuill style={{ width: '600px', height: '400px' }} theme="snow" value={value} onChange={setValue} />
        </section>
    )
}

export default Posts