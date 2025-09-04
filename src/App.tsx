import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checklist, { EquipmentChecklistItem, PhysicalChecklistItem, TechnicalChecklistItem } from './components/checklist';
import ListInfo from './components/listinfo';
import SelectMachinery from './components/selectMachinery';
import MachineryList from './components/MachineryList';
import VisitedCases from './components/visitedcases';

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
    { id: '8', item: 'Service by and warrantee (....12...) Months (5)', result: 'ใส่คะแนน', checked: true, status: 'ใส่คะแนน' },
    { id: '9', item: 'Remote On line', result: 'OK', checked: true, status: 'OK' },
    { id: '10', item: 'Control Panel', result: 'OK', checked: true, status: 'OK' },
    { id: '11', item: 'Manual and Training document (5)', result: 'OK', checked: true, status: 'OK' },
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

// Sample data for the machinery list page
const machineryList: { [key: string]: typeof systemData[] } = {
    'เครื่องเป่าขวด': [
        { ...systemData, machineNo: 'A', system: 'BDM-GR-B9S' },
        { ...systemData, machineNo: 'B', system: 'BDM-GR-B9S' },
        { ...systemData, machineNo: 'C', system: 'BDM-GR-B9S' },
    ],
    'เครื่องจักรประเภท B': [
        { ...systemData, machineNo: 'B1', machineType: 'เครื่องจักรประเภท B', system: 'ประเภท B' },
        { ...systemData, machineNo: 'B2', machineType: 'เครื่องจักรประเภท B', system: 'ประเภท B' },
    ],
    'เครื่องจักรประเภท C': [
        { ...systemData, machineNo: 'C1', machineType: 'เครื่องจักรประเภท C', system: 'ประเภท C' },
    ]
};

// Sample data for existing cases
const visitedCasesData = [
    { ...systemData, machineNo: 'C', projectName: 'น้ำดื่ม Line 2', date: '25-Aug-25' },
    { ...systemData, machineNo: 'A', projectName: 'น้ำอัดลม Line 1', date: '15-Aug-25' },
    { ...systemData, machineNo: 'B', projectName: 'น้ำผลไม้ Line 5', date: '10-Aug-25' },
];

function App() {
    const [currentPage, setCurrentPage] = useState('select'); // เริ่มต้นที่หน้า Select Type of Machinery
    const [selectedMachineryType, setSelectedMachineryType] = useState<string | null>(null);
    const [selectedMachinery, setSelectedMachinery] = useState<typeof systemData | null>(null);

    // Handles starting a new case
    const handleStartNewCase = () => {
        setCurrentPage('list');
    };

    // Handles selecting a visited case
    const handleSelectVisitedCase = (machinery: typeof systemData) => {
        setSelectedMachinery(machinery);
        setCurrentPage('checklist');
    };

    // Handles selecting a machinery type, and navigates to the list page.
    const handleSelectMachineryType = (machineryType: string) => {
        setSelectedMachineryType(machineryType);
        setCurrentPage('firstVisit'); // เปลี่ยนเป็นไปหน้า Visit for the first time?
    };

    // Handles selecting a specific machine from the list, and navigates to the checklist page.
    const handleSelectMachinery = (machinery: typeof systemData) => {
        setSelectedMachinery(machinery);
        setCurrentPage('checklist');
    };

    // Handles back button clicks, navigating to the correct previous page.
    const handleBack = () => {
        if (currentPage === 'checklist') {
            setCurrentPage('list');
        } else if (currentPage === 'list') {
            setCurrentPage('firstVisit');
        } else if (currentPage === 'visitedCases') {
            setCurrentPage('firstVisit');
        } else if (currentPage === 'firstVisit') {
            setCurrentPage('select');
        }
    };

    // Renders the correct page component based on the current state.
    const renderPage = () => {
        switch (currentPage) {
            case 'select':
                return <SelectMachinery onSelectMachinery={handleSelectMachineryType} />;
            case 'firstVisit':
                return (
                    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
                        <h1 className="mb-4">ต้องการเริ่มเคสใหม่หรือไม่?</h1>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-secondary mb-3" onClick={handleBack}>
                                ย้อนกลับ
                            </button>
                            <button className="btn btn-primary btn-lg" onClick={handleStartNewCase}>
                                ใช่, สร้างเคสใหม่
                            </button>
                            <button className="btn btn-outline-secondary btn-lg mt-2" onClick={() => setCurrentPage('visitedCases')}>
                                ไม่, เลือกเคสที่เคยเยี่ยมชม
                            </button>
                        </div>
                    </div>
                );
            case 'visitedCases':
                return (
                    <VisitedCases
                        visitedCases={visitedCasesData}
                        onSelectCase={handleSelectVisitedCase}
                        onBack={handleBack}
                    />
                );
            case 'list':
                const list = selectedMachineryType ? machineryList[selectedMachineryType] : [];
                return (
                    <MachineryList
                        list={list}
                        selectedMachineryType={selectedMachineryType || ''}
                        onSelectMachinery={handleSelectMachinery}
                        onBack={handleBack}
                    />
                );
            case 'checklist':
                if (!selectedMachinery) return null;
                return (
                    <>
                        <button className="btn btn-secondary mt-3 ms-3" onClick={handleBack}>
                            ย้อนกลับ
                        </button>
                        <ListInfo {...selectedMachinery} />
                        <Checklist
                            equipmentItems={equipmentItems}
                            physicalItems={physicalItems}
                            technicalItems={technicalItems}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return <div className="App">{renderPage()}</div>;
}

export default App;
