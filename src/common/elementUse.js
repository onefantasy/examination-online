import {
  Button,
  Image,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Checkbox,
  Loading,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  // element 隐藏的组件，滚动条
  Scrollbar,
  Avatar,
  Card,
  RadioGroup,
  Radio,
  Upload,
  Breadcrumb,
  BreadcrumbItem,
  DatePicker,
} from 'element-ui'

const element = {}

element.install = function(Vue){
    Vue.use(Button)
    Vue.use(Image)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Checkbox)
    Vue.use(Loading)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Menu)
    Vue.use(Submenu)
    Vue.use(MenuItem)
    Vue.use(MenuItemGroup)
    Vue.use(Scrollbar)
    Vue.use(Avatar)
    Vue.use(Card)
    Vue.use(RadioGroup)
    Vue.use(Radio)
    Vue.use(Upload)
    Vue.use(Breadcrumb)
    Vue.use(BreadcrumbItem)
    Vue.use(DatePicker)
}

export default element