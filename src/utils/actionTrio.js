export default function actionTrio() {
  const prefix = Array.prototype.slice.call(arguments).join('/');
  const BEGIN = prefix + '_BEGIN';
  const SUCCESS = prefix + '_SUCCESS';
  const ERROR = prefix + '_ERROR';
  return {
    trio: [BEGIN, SUCCESS, ERROR],
    BEGIN, SUCCESS, ERROR
  };
}
