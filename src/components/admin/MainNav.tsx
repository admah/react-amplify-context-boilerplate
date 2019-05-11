import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Row, Col } from "antd";

const MainNav: React.FC = () => {
  const links = [
    {
      to: "/item1",
      exact: true,
      title: "Item1"
    },
    {
      to: "/item2",
      exact: true,
      title: "Item 2"
    },
    {
      to: "/item3",
      exact: true,
      title: "Item 3"
    }
  ];

  return (
    <Row>
      <Col span={14} push={10}>
        <Menu
          className="main-navigation"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "80px", border: "none" }}
          data-testid="MainNavMenu"
        >
          {links.map(link => (
            <Menu.Item key={link.title}>
              <NavLink
                to={link.to}
                exact={link.exact}
                key={link.title}
                data-testid="MainNavLink"
              >
                <div>{link.title}</div>
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Col>
    </Row>
  );
};

export default MainNav;
