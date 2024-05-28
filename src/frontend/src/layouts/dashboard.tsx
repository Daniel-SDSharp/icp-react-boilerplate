import React, { ReactNode } from 'react'

import Content from '../components/content'
import Footer from '../components/footer'
import Main from '../components/main'

interface DashboardProps {
  children: ReactNode
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => (
  <React.Fragment>
      <Main>
        <Content>{children}</Content>
        <Footer />
      </Main>
  </React.Fragment>
)

export default Dashboard