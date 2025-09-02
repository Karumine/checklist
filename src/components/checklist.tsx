// src/components/checklist.tsx
import React, { useState, useMemo } from 'react';

// กำหนด Interface สำหรับข้อมูลตาราง Equipment
export interface EquipmentChecklistItem {
    id: string;
    item: string;
    actual: string | number;
    condition: {
        status: 'OK' | 'Fault' | 'Overload';
        fault?: string;
    };
    remark?: string;
    unit?: string;
    image?: string; // เพิ่ม field สำหรับเก็บ URL รูปภาพ
}

// กำหนด Interface สำหรับข้อมูลตาราง Physicals
export interface PhysicalChecklistItem {
    id: string;
    item: string;
    value: number | string;
}

// กำหนด Interface สำหรับข้อมูลตาราง Technical-Operation
export interface TechnicalChecklistItem {
    id: string;
    item: string;
    result: 'OK' | '5_points';
    checked: boolean;
    comment?: string;
    // เพิ่ม field ใหม่สำหรับช่องกรอกข้อความใน Result
    resultText?: string;
    // เพิ่มสถานะใหม่สำหรับ Result ที่จะใช้ในการเลือก
    status: 'OK' | '5_points';
    image?: string; // เพิ่ม field สำหรับเก็บ URL รูปภาพ
}

// กำหนด Interface สำหรับ props ของ Checklist ทั้งหมด
interface CombinedChecklistProps {
    equipmentItems: EquipmentChecklistItem[];
    physicalItems: PhysicalChecklistItem[];
    technicalItems: TechnicalChecklistItem[];
}

const Checklist: React.FC<CombinedChecklistProps> = ({ equipmentItems, technicalItems }) => {
    // สร้างรายการ Physicals ใหม่ตามที่ผู้ใช้ร้องขอ
    const newPhysicalItems: PhysicalChecklistItem[] = [
        { id: 'ph', item: 'Plant Housing', value: '' },
        { id: 'bp', 'item': 'Body paint', value: '' },
        { id: 'cb', item: 'Chassis base', value: '' },
        { id: 'orf', item: 'Opr risk free', value: '' },
        { id: 'v', item: 'Ventilation', value: '' },
        { id: 's', item: 'Staffing', value: '' },
        { id: 'sd', item: 'Safety device', value: '' },
        { id: 'rh', item: 'Run Hours', value: '' },
    ];

    // สร้าง state สำหรับ Physicals Check list เพื่อให้สามารถแก้ไขค่าได้
    const [physicalValues, setPhysicalValues] = useState<Record<string, number | string | undefined>>(() => {
        const initialValues: Record<string, number | string | undefined> = {};
        newPhysicalItems.forEach(item => {
            initialValues[item.item] = ''; // กำหนดค่าเริ่มต้นเป็นสตริงว่าง
        });
        return initialValues;
    });

    // สร้าง state สำหรับ Equipment Check list เพื่อให้สามารถแก้ไขค่าได้
    const [equipment, setEquipment] = useState(equipmentItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<EquipmentChecklistItem | null>(null);
    const [editingRemarkId, setEditingRemarkId] = useState<string | null>(null);
    const [editingFaultId, setEditingFaultId] = useState<string | null>(null);


    // สร้าง state สำหรับ Technical-Operation และ General Comments
    const [technical, setTechnical] = useState(technicalItems);
    const [operationTesting, setOperationTesting] = useState('');
    const [generalComments, setGeneralComments] = useState('');
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [isTechnicalModalOpen, setIsTechnicalModalOpen] = useState(false);
    const [selectedTechnicalItem, setSelectedTechnicalItem] = useState<TechnicalChecklistItem | null>(null);
    const [generalCommentScore, setGeneralCommentScore] = useState<number | string>('');

    // ฟังก์ชันสำหรับคำนวณคะแนนรวมและเปอร์เซ็นต์แบบไดนามิก
    const { totalScore, percentage, maxPossibleScore } = useMemo(() => {
        // คำนวณคะแนนจาก Physicals Check list
        const physicalScore: number = Object.values(physicalValues).reduce((sum: number, value) => {
            const num = Number(value);
            return sum + (isNaN(num) ? 0 : num);
        }, 0);

        // คำนวณคะแนนจาก Technical-Operation
        const technicalScore: number = technical.reduce((sum: number, item) => {
            if (item.status === '5_points') {
                const num = Number(item.resultText);
                return sum + (isNaN(num) ? 0 : num);
            }
            return sum;
        }, 0);

        // คำนวณคะแนนจาก General Comments
        const generalScore: number = Number(generalCommentScore) || 0;

        const calculatedTotalScore: number = physicalScore + technicalScore + generalScore;

        // คำนวณคะแนนเต็มแบบไดนามิก
        const physicalMaxScore = Object.values(physicalValues).filter(value => !isNaN(Number(value)) && String(value).trim() !== '').length * 5;
        const technicalMaxScore = technical.filter(item => item.status === '5_points' && item.resultText && String(item.resultText).trim() !== '').length * 5;
        const generalMaxScore = generalCommentScore && String(generalCommentScore).trim() !== '' && !isNaN(Number(generalCommentScore)) ? 10 : 0;
        const calculatedMaxPossibleScore = physicalMaxScore + technicalMaxScore + generalMaxScore;

        const calculatedPercentage: number = calculatedMaxPossibleScore > 0 ? (calculatedTotalScore / calculatedMaxPossibleScore) * 100 : 0;

        return {
            totalScore: calculatedTotalScore.toFixed(2),
            percentage: calculatedPercentage.toFixed(2),
            maxPossibleScore: calculatedMaxPossibleScore.toFixed(2),
        };
    }, [physicalValues, technical, generalCommentScore]);

    // ฟังก์ชันสำหรับเปิด Modal และตั้งค่า Item ที่ถูกเลือก (Equipment)
    const openModal = (item: EquipmentChecklistItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    // ฟังก์ชันสำหรับเปิด Modal และตั้งค่า Item ที่ถูกเลือก (Technical)
    const openTechnicalModal = (item: TechnicalChecklistItem) => {
        setSelectedTechnicalItem(item);
        setIsTechnicalModalOpen(true);
    };

    // ฟังก์ชันสำหรับปิด Modal ทั้งสอง
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
        setIsTechnicalModalOpen(false);
        setSelectedTechnicalItem(null);
    };

    // เพิ่มฟังก์ชันใหม่สำหรับจัดการการอัปโหลดรูปภาพ
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, itemId: string, tableType: 'equipment' | 'technical') => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            if (tableType === 'equipment') {
                setEquipment(prevEquipment =>
                    prevEquipment.map(item =>
                        item.id === itemId ? { ...item, image: imageUrl } : item
                    )
                );
            } else if (tableType === 'technical') {
                setTechnical(prevTechnical =>
                    prevTechnical.map(item =>
                        item.id === itemId ? { ...item, image: imageUrl } : item
                    )
                );
            }
        }
    };

    // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงค่าใน Modal (Equipment)
    const handleStatusChange = (newStatus: 'OK' | 'Fault' | 'Overload') => {
        if (selectedItem) {
            setEquipment(prevEquipment =>
                prevEquipment.map(item =>
                    item.id === selectedItem.id
                        ? {
                            ...item,
                            condition: {
                                ...item.condition,
                                status: newStatus,
                                // ลบข้อความ Fault เมื่อสถานะไม่ใช่ Fault
                                fault: newStatus === 'Fault' ? item.condition.fault : undefined,
                            },
                        }
                        : item
                )
            );
            closeModal();
        }
    };

    const handleFaultChange = (id: string, newFault: string) => {
        setEquipment(prevEquipment =>
            prevEquipment.map(item =>
                item.id === id ? { ...item, condition: { ...item.condition, fault: newFault } } : item
            )
        );
    };

    // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงค่าใน Modal (Technical)
    const handleTechnicalStatusChange = (newStatus: 'OK' | '5_points') => {
        if (selectedTechnicalItem) {
            setTechnical(prevTechnical =>
                prevTechnical.map(item =>
                    item.id === selectedTechnicalItem.id ? { ...item, status: newStatus, checked: newStatus === 'OK' } : item
                )
            );
            closeModal();
        }
    };

    // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงข้อความในช่อง Remark (Equipment)
    const handleRemarkChange = (id: string, newRemark: string) => {
        setEquipment(prevEquipment =>
            prevEquipment.map(item =>
                item.id === id ? { ...item, remark: newRemark } : item
            )
        );
    };

    // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงข้อความในช่อง Comment ของตาราง Technical
    const handleTechnicalCommentChange = (id: string, newComment: string) => {
        setTechnical(prevTechnical =>
            prevTechnical.map(item =>
                item.id === id ? { ...item, comment: newComment } : item
            )
        );
    };

    // สร้างตาราง Equipment
    const renderEquipmentTable = () => (
        <div className="table-responsive mb-5">
            <h4 className="fw-bold text-primary mb-3">Equipment check list11111111111111111</h4>
            <table className="table table-bordered table-striped text-center">
                <thead className="table-light">
                    <tr>
                        <th scope="col" style={{ width: '5%' }}></th>
                        <th scope="col" style={{ width: '15%' }}>Item</th>
                        <th scope="col" style={{ width: '15%' }}>Actual</th>
                        <th scope="col" colSpan={2} style={{ width: '20%' }}>Condition</th>
                        <th scope="col" style={{ width: '35%' }}>Remark</th>
                    </tr>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col" className="text-center">Status</th>
                        <th scope="col" className="text-center">Fault</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {equipment.map((item) => (
                        <tr key={item.id}>
                            <td>
                                {item.image ? (
                                    <img src={item.image} alt="preview" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                ) : (
                                    <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
                                        📸
                                        <input
                                            type="file"
                                            accept="image/*"
                                            capture="environment" // แก้ไขตรงนี้
                                            onChange={(e) => handleImageUpload(e, item.id, 'equipment')}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                )}
                            </td>
                            <td className="text-start">{item.item}</td>
                            <td className="text-center">{item.actual} {item.unit}</td>
                            <td className="text-center">
                                <span
                                    className={`badge ${item.condition.status === 'OK' ? 'bg-success' : 'bg-danger'} cursor-pointer`}
                                    onClick={() => openModal(item)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {item.condition.status}
                                </span>
                            </td>

                            <td className="text-center" onClick={() => setEditingFaultId(item.id)}>
                                {editingFaultId === item.id ? (
                                    <textarea
                                        className="form-control"
                                        rows={2}
                                        value={item.condition.fault || ''}
                                        onChange={(e) => handleFaultChange(item.id, e.target.value)}
                                        onBlur={() => setEditingFaultId(null)}
                                        autoFocus
                                    />
                                ) : (
                                    <span style={{ cursor: 'pointer' }}>{item.condition.fault || 'Click to add fault'}</span>
                                )}
                            </td>
                            <td className="text-start" onClick={() => setEditingRemarkId(item.id)}>
                                {editingRemarkId === item.id ? (
                                    <textarea
                                        className="form-control"
                                        rows={2}
                                        value={item.remark || ''}
                                        onChange={(e) => handleRemarkChange(item.id, e.target.value)}
                                        onBlur={() => setEditingRemarkId(null)}
                                        autoFocus
                                    />
                                ) : (
                                    <span style={{ cursor: 'pointer' }}>{item.remark || 'Click to add remark'}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // สร้างตาราง Physicals
    const renderPhysicalsTable = () => (
        <div className="container mt-5">
            <div className="card shadow-sm border-0 p-3">
                <div className="card-body">
                    <h4 className="fw-bold text-primary mb-3">Physicals Check list</h4>
                    <div className="row g-3">
                        {newPhysicalItems.map((item) => (
                            <div key={item.id} className="col-md-6 d-flex align-items-center mb-2">
                                <div className="d-flex w-100 align-items-center">
                                    <span className="me-2 text-start flex-grow-1">{item.item}</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={physicalValues[item.item] || ''}
                                        onChange={(e) => setPhysicalValues({ ...physicalValues, [item.item]: e.target.value })}
                                        style={{
                                            width: '50px',
                                            
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // สร้างตาราง Technical-Operation
    const renderTechnicalTable = () => (
        <div className="table-responsive mb-5">
            <h4 className="fw-bold text-primary mb-3">Technical- Operation</h4>
            <div className="mb-3">
                <label htmlFor="operationTesting" className="form-label fw-bold">Operation Testing</label>
                <textarea
                    className="form-control"
                    id="operationTesting"
                    rows={3}
                    value={operationTesting}
                    onChange={(e) => setOperationTesting(e.target.value)}
                    placeholder="ระบุผลการทดสอบการปฏิบัติงาน (Operation Testing) ที่นี่..."
                />
            </div>
            <table className="table table-bordered table-striped text-center">
                <thead className="table-light">
                    <tr>
                        <th scope="col" style={{ width: '5%' }}></th>
                        <th scope="col" style={{ width: '30%' }}>Item</th>
                        <th scope="col" colSpan={2} style={{ width: '15%' }}>Result</th>
                        <th scope="col" style={{ width: '50%' }}>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {technical.map((item) => (
                        <tr key={item.id}>
                            <td>
                                {item.image ? (
                                    <img src={item.image} alt="preview" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                ) : (
                                    <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
                                        📸
                                        <input
                                            type="file"
                                            accept="image/*"
                                            capture="environment" // แก้ไขตรงนี้
                                            onChange={(e) => handleImageUpload(e, item.id, 'technical')}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                )}
                            </td>
                            <td className="text-start">{item.item}</td>
                            <td className="text-center">
                                {item.id === 'service' || item.id === 'remote' || item.id === 'manual' ? (
                                    item.status
                                ) : (
                                    <span
                                        className={`badge ${item.status === 'OK' ? 'bg-success' : 'bg-secondary'}`}
                                        onClick={() => openTechnicalModal(item)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {item.status === 'OK' ? 'OK' : '5คะแนน'}
                                    </span>
                                )}
                            </td>
                            <td className="text-center">
                                {item.status === 'OK' ? (
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={item.checked}
                                        readOnly
                                    />
                                ) : (
                                    <textarea
                                        className="form-control"
                                        rows={1}
                                        value={item.resultText || ''}
                                        onChange={(e) => setTechnical(prev => prev.map(t => t.id === item.id ? { ...t, resultText: e.target.value } : t))}
                                    />
                                )}
                            </td>
                            <td className="text-start" onClick={() => setEditingCommentId(item.id)}>
                                {editingCommentId === item.id ? (
                                    <textarea
                                        className="form-control"
                                        rows={2}
                                        value={item.comment || ''}
                                        onChange={(e) => handleTechnicalCommentChange(item.id, e.target.value)}
                                        onBlur={() => setEditingCommentId(null)}
                                        autoFocus
                                    />
                                ) : (
                                    <span style={{ cursor: 'pointer' }}>{item.comment || 'คลิกเพื่อเพิ่มคอมเมนต์'}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // สร้างส่วน General Comments
    const renderGeneralComments = () => (
        <div className="container mt-5">
            <h4 className="fw-bold text-primary mb-3">General Comments</h4>
            <div className="card shadow-sm border-0 p-3">
                <div className="card-body">
                    <textarea
                        className="form-control"
                        rows={5}
                        value={generalComments}
                        onChange={(e) => setGeneralComments(e.target.value)}
                        placeholder="Add general comments here..."
                    />
                    <div className="d-flex justify-content-end align-items-center mt-2">
                        <h5 className="me-2 mb-0">คะแนน (เต็ม 10 คะแนน):</h5>
                        <input
                            type="number"
                            className="form-control"
                            style={{ width: '60px' }}
                            value={generalCommentScore}
                            onChange={(e) => setGeneralCommentScore(e.target.value)}
                            min="0"
                            max="10"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    // สร้างส่วน Total Score
    const renderTotalScore = () => (
        <div className="container mt-4 mb-5">
            <div className="d-flex flex-column align-items-end">
                <div className="d-flex align-items-center mb-2">
                    <h5 className="me-2 mb-0">คะแนนที่ได้:</h5>
                    <span className="fw-bold">{totalScore}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                    <h5 className="me-2 mb-0">คะแนนเต็ม:</h5>
                    <span className="fw-bold">{maxPossibleScore}</span>
                </div>
                <div className="d-flex align-items-center">
                    <h5 className="me-2 mb-0">เปอร์เซ็นต์:</h5>
                    <span className="fw-bold">{percentage}%</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mt-5">
            <div className="card shadow-sm border-0 p-3">
                <div className="card-body">
                    {renderPhysicalsTable()}
                    <hr className="my-5" />
                    {renderEquipmentTable()}
                    <hr className="my-5" />
                    {renderTechnicalTable()}
                    <hr className="my-5" />
                    {renderGeneralComments()}
                    {renderTotalScore()}
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="modal show d-block"
                    tabIndex={-1}
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">เลือกสถานะ</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <button className="btn btn-success w-100 mb-2" onClick={() => handleStatusChange('OK')}>OK</button>
                                <button className="btn btn-danger w-100 mb-2" onClick={() => handleStatusChange('Fault')}>Fault</button>
                                <button className="btn btn-warning w-100" onClick={() => handleStatusChange('Overload')}>Overload</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isTechnicalModalOpen && (
                <div
                    className="modal show d-block"
                    tabIndex={-1}
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">เลือกสถานะ</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <button className="btn btn-success w-100 mb-2" onClick={() => handleTechnicalStatusChange('OK')}>OK</button>
                                <button className="btn btn-secondary w-100" onClick={() => handleTechnicalStatusChange('5_points')}>5คะแนน</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checklist;