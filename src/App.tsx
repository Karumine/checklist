// src/App.tsx

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checklist from './components/checklist';
import ListInfo from './components/listinfo';
import { EquipmentChecklistItem, PhysicalChecklistItem, TechnicalChecklistItem } from './components/checklist';

// Sample data for Equipment check list
const equipmentItems: EquipmentChecklistItem[] = [
  { id: '1', item: 'Capacity', actual: '9 / 14,000', unit: 'Hours', condition: { status: 'OK' } },
  { id: '2', item: 'Size', actual: 600, unit: 'cc', condition: { status: 'OK' } },
  { id: '3', item: 'Chiller', actual: 15, unit: 'C', condition: { status: 'OK' } },
  { id: '4', item: 'Air pressure', actual: 30, unit: 'kPa', condition: { status: 'OK' } },
  { id: '5', item: 'Coolant temp', actual: 30, unit: 'C', condition: { status: 'OK' } },
  { id: '6', item: 'Air dryer', actual: 28, unit: 'C', condition: { status: 'OK' }, remark: 'Blue Diamond จะทำการแก้ไขโดยด่วน' },
  { id: '7', item: 'Machine curr', actual: 100, unit: 'Amp', condition: { status: 'OK' } },
  { id: '8', item: 'Total current', actual: 263, unit: 'Amp', condition: { status: 'OK' } },
  { id: '9', item: 'Power status', actual: '380 / 870', unit: '', condition: { status: 'Overload', fault: 'เมื่อเดินเครื่องพร้อมกัน 3 Lines' } },
];

// Sample data for Physicals Check list
const physicalItems: PhysicalChecklistItem[] = [
  { id: 'ph', item: 'Plant Housing', value: 5 },
  { id: 'v', item: 'Ventilation', value: 5 },
  { id: 'sd', item: 'Safety device', value: 5 },
  { id: 'bp', item: 'Body paint', value: 5 },
  { id: 'orf', item: 'Opr risk free', value: 5 },
  { id: 's', item: 'Staffing', value: 5 },
];

// Sample data for Technical-Operation
const technicalItems: TechnicalChecklistItem[] = [
  { id: '1', item: 'Electrical grounding (ระบบสายดิน)', result: 'OK', checked: true, status: 'OK' },
  { id: '2', item: 'Power connecting (การเชื่อมต่อสายไฟ)', result: 'OK', checked: true, status: 'OK' },
  { id: '3', item: 'Lightning Protection (ระบบป้องกันฟ้าผ่า)', result: 'OK', checked: true, status: 'OK' },
  { id: '4', item: 'Location (สถานที่ตั้งเครื่อง)', result: 'OK', checked: true, status: 'OK' },
  { id: '5', item: 'Utility connecting (การเชื่อมต่อระบบ)', result: 'OK', checked: true, status: 'OK' },
  { id: '6', item: 'Operation (การปฏิบัติการ)', result: 'OK', checked: true, status: 'OK' },
  { id: '7', item: 'Sparepart (การเตรียมอะไหล่สำรอง)', result: 'OK', checked: true, status: 'OK' },
  { id: '8', item: 'Service by and warrantee (....12...) Months', result: 'OK', checked: true, status: 'OK' },
  { id: '9', item: 'Remote On line', result: 'OK', checked: true, status: 'OK' },
  { id: '10', item: 'Control Panel', result: 'OK', checked: true, status: 'OK' },
  { id: '11', item: 'Manual and Training document', result: 'OK', checked: true, status: 'OK' },
];

const systemData = {
  brand: 'BDM GR-B9S',
  poNumber: 'N/A',
  contactRole: 'Engineer',
  systemName: 'BDM GR-B9S',
  projectName: 'น้ำดื่มขอนแก่น Line 3',
  date: '29-Aug-25',
  location: 'ยางขาม, หนองเรือ',
  province: 'Khonkaen',
  contactPerson: 'Kh.บุญยัง',
  mobile: '095-160-0008', // Changed mobileNo to mobile to match the required prop name
  machineNo: 'A',
  machineType: 'เครื่องเป่าขวด',
  handoverType: 'Visit',
  system: 'BDM-GR-B9S',
};

function App() {
  return (
    <div className="App">
      <ListInfo {...systemData} />
      <Checklist
        equipmentItems={equipmentItems}
        physicalItems={physicalItems}
        technicalItems={technicalItems}
      />
    </div>
  );
}

export default App;
