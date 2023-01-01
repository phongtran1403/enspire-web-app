import classNames from 'classnames/bind'
import style from './index.module.scss'
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generatePicker from 'antd/es/date-picker/generatePicker';

const DatePicker = generatePicker(momentGenerateConfig);

export default DatePicker;