import { FC, useState } from 'react'
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import Link from 'next/link'


interface RouterItem {
  name: string
  link: string
}

const pages: RouterItem[] = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Trade',
    link: '/trade',
  },
  {
    name: 'Demo',
    link: '/demo',
  },
]
export const GlobalNav: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>()

  const WebNav = () => {
    return <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map((page) => <Link key={page.name} href={page.link} passHref><Button sx={{ my: 2, color: 'white', display: 'block' }}>{page.name}</Button></Link>)}
    </Box>
  }

  const MobileNav = () => {
    return <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton color="inherit" onClick={(e) => setAnchorElNav(e.currentTarget)}>
        -
      </IconButton>
      <Menu
        anchorEl={anchorElNav}
        open={Boolean(anchorElNav)}
        onClose={() => setAnchorElNav(null)}
      >
        {
          pages.map((page) => {
            return <MenuItem key={page.name} onClick={() => setAnchorElNav(null)}><Link href={page.link}>{page.name}</Link></MenuItem>
          })
        }
      </Menu>
    </Box>
  }

  return <AppBar position="static">
    <Toolbar>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
      >
        Hipo-Perp
      </Typography>
      <WebNav />
      <MobileNav />
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, mr: 2, display: { xs: 'flex', md: 'none' } }}
      >
        Hipo-Perp
      </Typography>
    </Toolbar>
  </AppBar>
}