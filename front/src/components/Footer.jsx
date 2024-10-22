import React from 'react'

import {Row, Col, Container } from 'react-bootstrap'

export default function Footer() {
    const cYear = new Date().getFullYear()
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    <p>Book's Pro &copy; {cYear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}
