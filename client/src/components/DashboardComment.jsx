import React from 'react'
import '../styles/dashboard.css'
import { Link } from 'react-router-dom'

import { FaBitbucket } from 'react-icons/fa'

const DashboardComment = () => {
    return (
        <div className="dash_comment">
            <h3 className='comment_heading'>Recent comments</h3>
            <Link className='link_view' to='/dashboard/comments'>view all</Link>
            <div className="comment_header">
                <p>Comment Content</p>
            </div>
            <div className="comment_content">
                <p>This is check of coment there is no logic in comment</p>
                <FaBitbucket color='red' className='delete_icon' />
                
            </div>
            
        </div>
    )
}

export default DashboardComment