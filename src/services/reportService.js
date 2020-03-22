
import Http from './http';

import { database } from "../config/firebase";
export default class ReportService {

    static async submitReport(addParam, callback) {
        const newReportRef = database.ref().child('reports').push();
        const newReportKey = newReportRef.key;
        addParam.newReportId = newReportKey;

        let reportRef = database.ref('reports/' + newReportKey);
        reportRef.set(addParam).then(
        ).catch();

        return newReportKey;
    }
}