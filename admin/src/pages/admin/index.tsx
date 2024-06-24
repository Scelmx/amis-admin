import * as React from "react";
import {
  RouteComponentProps,
  Link,
  Switch,
  Redirect,
  matchPath,
} from "react-router-dom";
import { Space } from "antd";
import { Avatar, Dropdown } from "antd";
import { Layout, Button, AsideNav } from "amis";
import { IMainStore } from "@/stores";
import { inject, observer } from "mobx-react";
import { request } from "@/utils/requestInterceptor";
import RouterGuard from "@/routes/RouterGuard";
import { toast } from "amis";
import appStore from "@/stores/appStore"
import {
  UserOutlined,
} from "@ant-design/icons";

type NavItem = {
  label: string;
  children?: Array<NavItem>;
  icon?: string;
  path?: string;
  component?: React.ReactType;
  getComponent?: () => Promise<React.ReactType>;
};

function isActive(link: any, location: any) {
  let path = link.path;

  const ret = matchPath(location.pathname, {
    path: path ? path.replace(/\?.*$/, "") : "",
    exact: true,
    strict: true,
  });

  if (link != null && link.children != null) {
    let items = link.children;
    for (const item of items) {
      let flag = isActive(item, location)
      if (flag) {
        return true;
      } else {
        continue;
      }
    }
  }

  return !!ret;
}

export interface AdminProps extends RouteComponentProps<any> {
  store: IMainStore;
}

@inject("store")
@observer
export default class Admin extends React.Component<AdminProps, any> {
  state = {
    pathname: "",
    hasLoadMenu: false,
    navigations: [
      {
        label: "导航",
        children: [
          {
            label: "产品管理",
            icon: "fa fa-user",
            path: "",
            children: [
              {
                label: '客户列表',
                path: "/customer/index"
              },
              {
                label: "产品列表",
                path: "/product/index",
              },
              {
                label: '产品图片',
                path: "/product/image-manange"
              }
            ],
          },
          {
            label: "生产计划",
            icon: "fa fa-plan",
            path: "",
            children: [{
              label: '订单列表',
              path: "/produce-plan/orders"
            }]
          }
        ]
      },
    ],
  };

  renderHeader() {
    const store = this.props.store;
    return (
      <div>
        <div className={`cxd-Layout-brandBar`}>
          <button
            onClick={store.toggleOffScreen}
            className="pull-right visible-xs"
          >
            <i className="fa fa-bars text-white"></i>
          </button>
          <div className={`cxd-Layout-brand`}>
            <span className="hidden-folded m-l-sm">智能运维</span>
          </div>
        </div>
        <div className={`cxd-Layout-headerBar`}>
          <div className="nav navbar-nav hidden-xs pull-left">
            <Button
              level="link"
              className="no-shadow navbar-btn"
              onClick={store.toggleAsideFolded}
              tooltip="展开或收起侧边栏"
              placement="bottom"
              iconOnly
            >
              <i
                className={store.asideFolded ? "fa fa-indent" : "fa fa-outdent"}
              />
            </Button>
          </div>

          <div className="m-l-auto hidden-xs pull-right pt-2" >
            <Dropdown placement="bottomLeft" trigger={['click', 'hover']}>
              <Button>
                <Space>
                  <Avatar icon={<UserOutlined rev={undefined} />} />
                  admin
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }

  renderAside() {
    const location = this.props.location;
    const store = this.props.store;

    return (
      <AsideNav
        key={store.asideFolded ? "folded-aside" : "aside"}
        navigations={this.state.navigations}
        renderLink={({ link, toggleExpand, classnames: cx, depth }: any) => {
          if (link.hidden) {
            return null;
          }
          let children: any[] = [];

          if (link.children) {
            children.push(
              <span
                key="expand-toggle"
                className={cx("AsideNav-itemArrow")}
                onClick={(e) => toggleExpand(link, e)}
              ></span>
            );
          }

          link.badge &&
            children.push(
              <b
                key="badge"
                className={cx(
                  `AsideNav-itemBadge`,
                  link.badgeClassName || "bg-info"
                )}
              >
                {link.badge}
              </b>
            );

          if (link.icon) {
            children.push(
              <i key="icon" className={cx(`AsideNav-itemIcon`, link.icon)} />
            );
          } else if (store.asideFolded && depth === 1) {
            children.push(
              <i
                key="icon"
                className={cx(
                  `AsideNav-itemIcon`,
                  link.children ? "fa fa-folder" : "fa fa-info"
                )}
              />
            );
          }
          children.push(
            <span key="label" className={cx("AsideNav-itemLabel")}>
              {link.label}
            </span>
          );

          return link.path ? (
            link.active ? (
              <a>{children}</a>
            ) : (
              <Link to={link.path}>{children}</Link>
            )
          ) : (
            <a
              onClick={
                link.onClick
                  ? link.onClick
                  : link.children
                    ? () => toggleExpand(link)
                    : undefined
              }
            >
              {children}
            </a>
          );
        }}
        isActive={(link: any) => isActive(link, location)}
      />
    );
  }

  render() {
    const store = this.props.store;
    let pathname = this.props.location.pathname;

    if (pathname == "login" || pathname == "/") {
      return (
        <Switch>
          <RouterGuard />
          <Redirect to={`/404`} />
        </Switch>
      );
    } else {
      return (
        <Layout
          aside={this.renderAside()}
          header={this.renderHeader()}
          folded={store.asideFolded}
          offScreen={store.offScreen}
        >
          <Switch>
            <RouterGuard />
            <Redirect to={`/404`} />
          </Switch>
        </Layout>
      );
    }
  }
}
