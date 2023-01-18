import React, { useEffect, useRef } from 'react'
import '../Style/footer.css'
import productsData from '../dummyData'

function Footer() {

    return (
        <footer>
            <p>Copyright &copy; {new Date().getFullYear()}</p>
            <p className='footer-pagination-index'> <span className='footer-index'>01</span>/0{productsData.length}</p>
        </footer>
    )
}

export default Footer