import React, { useState } from'react';
import PropTypes from 'prop-types';
import { TabBar, Icon } from 'zarm';
import { useNavigate } from 'react-router-dom';

const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_2236655_w1mpqp7n1ni.js');
const NavBar = ({ showNav }) => {
    const [activeKey, setActiveKey] = useState('/');
const navigate = useNavigate();

const changeTab = (path) => {
    setActiveKey(path);
    navigate(path);
}


return (
    <TabBar visible={showNav} activeKey={activeKey} onChange={changeTab}>
        <TabBar.Item 
            itemKey = "/"
            title = "账单"
            icon={<TabIcon type="zhangdan" />}
        />
        <TabBar.Item 
            itemKey = "/data"
            title = "統計"
            icon={<TabIcon type="tongji" />}
        />
        <TabBar.Item
            itemKey = "/user"
            title = "我的"
            icon={<TabIcon type="wode" />}
        />
    </TabBar>
)
}
NavBar.PropTypes = {
    showNav: PropTypes.bool,
}

export default NavBar;



