import Vue from 'vue'
import projectInfo from '../../package.json'
import moment from 'moment'
import 'moment/locale/zh-cn'
import {
  Button,
  Badge,
  Layout,
  Popover,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Divider,
  Tabs,
  Form,
  Select,
  Row,
  Col,
  Input,
  InputNumber,
  DatePicker,
  Table,
  Alert,
  ConfigProvider,
  Card,
  Radio,
  Checkbox,
  message,
  notification,
  Modal,
  Spin,
  Tooltip,
  Popconfirm,
  Tag,
  Upload,
  Cascader,
  BackTop,
  List,
  Tree,
  Pagination,
  LocaleProvider
} from 'ant-design-vue'
// import '@babel/polyfill'
import 'core-js/stable'
// import 'core-js'
import 'regenerator-runtime/runtime'


Vue.component(Layout.name, Layout)
Vue.component(Layout.Sider.name, Layout.Sider)
Vue.component(Layout.Header.name, Layout.Header)
Vue.component(Layout.Content.name, Layout.Content)
Vue.component(Layout.Footer.name, Layout.Footer)

Vue.component(Button.name, Button)
Vue.component(Badge.name, Badge)
Vue.component(Popover.name, Popover)
Vue.component(Icon.name, Icon)
Vue.component(Dropdown.name, Dropdown)
Vue.component(Menu.name, Menu)
Vue.component(Menu.Item.name, Menu.Item)
Vue.component(Menu.SubMenu.name, Menu.SubMenu)
Vue.component(Menu.Divider.name, Menu.Divider)
Vue.component(Menu.ItemGroup.name, Menu.ItemGroup)
Vue.component(Avatar.name, Avatar)
Vue.component(Divider.name, Divider)
Vue.component(Tabs.name, Tabs)
Vue.component(Tabs.TabPane.name, Tabs.TabPane)
Vue.component(Form.name, Form)
Vue.component(Form.Item.name, Form.Item)
Vue.component(Select.name, Select)
Vue.component(Select.Option.name, Select.Option)
Vue.component(Select.OptGroup.name, Select.OptGroup)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Input.name, Input)
Vue.component(Input.Group.name, Input.Group)
Vue.component(Input.Search.name, Input.Search)
Vue.component(Input.TextArea.name, Input.TextArea)
Vue.component(InputNumber.name, InputNumber)
Vue.component(DatePicker.name, DatePicker)
Vue.component(DatePicker.MonthPicker.name, DatePicker.MonthPicker)
Vue.component(DatePicker.RangePicker.name, DatePicker.RangePicker)
Vue.component(DatePicker.WeekPicker.name, DatePicker.WeekPicker)
Vue.component(Table.name, Table)
Vue.component(Alert.name, Alert)
Vue.component(ConfigProvider.name, ConfigProvider)
Vue.component(LocaleProvider.name, LocaleProvider)
Vue.component(Card.name, Card)
Vue.component(Radio.name, Radio)
Vue.component(Radio.Group.name, Radio.Group)
Vue.component(Radio.Button.name, Radio.Button)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Checkbox.Group.name, Checkbox.Group)
Vue.component(Modal.name, Modal)
Vue.component(Spin.name, Spin)
Vue.component(Tooltip.name, Tooltip)
Vue.component(Popconfirm.name, Popconfirm)
Vue.component(Tag.name, Tag)
Vue.component(Tag.CheckableTag.name, Tag.CheckableTag)
Vue.component(Upload.name, Upload)
Vue.component(Cascader.name, Cascader)
Vue.component(BackTop.name, BackTop)
Vue.component(List.name, List)
Vue.component(List.Item.name, List.Item)
Vue.component(List.Item.Meta.name, List.Item.Meta)

Vue.component(Tree.name, Tree)
Vue.component(Pagination.name, Pagination)

moment.locale('zh-cn')

Vue.prototype.$moment = moment

Vue.prototype.$info = Modal.info
Vue.prototype.$confirm = Modal.confirm
message.config({
  top: '120px',
  duration: 3
})
Vue.prototype.$message = message
Vue.prototype.$notification = notification

// ----- 正式环境控制台打印版本号 -----
if (process.env.NODE_ENV !== 'development') {
  console.log('当前版本: %c ' + projectInfo.version, 'color: #fccc00;')
}
