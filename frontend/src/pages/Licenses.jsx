import React, { useState, useEffect } from 'react';
import {
    FileCheck2,
    PlusCircle,
    AlertCircle
} from 'lucide-react';

const Licenses = () => {
    const [allLicenses, setAllLicenses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLicense, setNewLicense] = useState({ licenseType: '', userId: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchLicenses = async () => {
        try {
            const response = await fetch('/api/license/all');
            if (response.ok) {
                const data = await response.json();
                setAllLicenses(data);
            }
        } catch (error) {
            console.error("Error fetching licenses:", error);
        }
    };

    useEffect(() => {
        fetchLicenses();
    }, []);

    const handleApplyLicense = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/license/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newLicense)
            });
            if (response.ok) {
                setIsModalOpen(false);
                setNewLicense({ licenseType: '', userId: '' });
                fetchLicenses();
            }
        } catch (error) {
            console.error("Error applying for license:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleApproveLicense = async (id) => {
        try {
            const response = await fetch(`/api/admin/approve/${id}`, { method: 'POST' });
            if (response.ok) fetchLicenses();
        } catch (error) {
            console.error("Error approving license:", error);
        }
    };

    const handleRejectLicense = async (id) => {
        try {
            const response = await fetch(`/api/admin/reject/${id}`, { method: 'POST' });
            if (response.ok) fetchLicenses();
        } catch (error) {
            console.error("Error rejecting license:", error);
        }
    };

    return (
        <div className="data-section">
            <div className="data-header">
                <h3>License Management ({allLicenses.length})</h3>
                <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
                    <PlusCircle size={18} />
                    Apply for License
                </button>
            </div>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>License ID</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Applicant ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allLicenses.length > 0 ? allLicenses.map((lic) => (
                            <tr key={lic.id}>
                                <td>#{lic.id}</td>
                                <td>{lic.licenseType || 'Commercial'}</td>
                                <td>
                                    <span className={`badge ${lic.status === 'APPROVED' ? 'badge-success' : lic.status === 'REJECTED' ? 'badge-danger' : 'badge-warning'}`}>
                                        {lic.status || 'Pending'}
                                    </span>
                                </td>
                                <td>{lic.userId}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {lic.status !== 'APPROVED' && (
                                            <button
                                                onClick={() => handleApproveLicense(lic.id)}
                                                style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#d1fae5', color: '#065f46', fontSize: '0.75rem', fontWeight: '600' }}
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {lic.status !== 'REJECTED' && (
                                            <button
                                                onClick={() => handleRejectLicense(lic.id)}
                                                style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#fee2e2', color: '#991b1b', fontSize: '0.75rem', fontWeight: '600' }}
                                            >
                                                Reject
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <AlertCircle size={32} color="#cbd5e1" style={{ margin: '0 auto 12px' }} />
                                    <p style={{ color: '#64748b' }}>No licenses found.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* New License Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white', padding: '32px', borderRadius: '16px',
                        width: '100%', maxWidth: '440px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Apply for License</h2>
                        <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '0.925rem' }}>Submit a new application.</p>

                        <form onSubmit={handleApplyLicense}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px' }}>License Type</label>
                                <input
                                    type="text" required placeholder="Commercial"
                                    value={newLicense.licenseType}
                                    onChange={(e) => setNewLicense({ ...newLicense, licenseType: e.target.value })}
                                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px' }}>Applicant ID (User ID)</label>
                                <input
                                    type="number" required placeholder="1"
                                    value={newLicense.userId}
                                    onChange={(e) => setNewLicense({ ...newLicense, userId: e.target.value })}
                                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button
                                    type="button" onClick={() => setIsModalOpen(false)}
                                    style={{ flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: '#f1f5f9', color: '#475569', fontWeight: '600' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit" disabled={isSubmitting}
                                    style={{ flex: 2, padding: '12px', borderRadius: '8px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '600', opacity: isSubmitting ? 0.7 : 1 }}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Licenses;
