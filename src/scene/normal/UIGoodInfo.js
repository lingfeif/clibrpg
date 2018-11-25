import React from "react";
import {connect} from "react-redux";
import {Card, Col} from 'antd';
import UIGoodBar from "./UIGoodBar";

class UIGoodInfo extends React.Component {

  render() {
    return (
      <Col span={8}>
        <Card
          title="商店"
          style={{height: "300px"}}
        >
          <UIGoodBar/>
        </Card>
      </Col>
    );
  }
}

export default connect((state, props) => {
  return {
  };
})(UIGoodInfo);
