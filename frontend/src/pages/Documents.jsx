import React, { useState, useEffect } from 'react';
import {
    FileText,
    AlertCircle,
    PlusCircle,
    Upload,
    CheckCircle2,
    XCircle
} from 'lucide-react';

const Documents = () => {
    const [allDocuments, setAllDocuments] = useState([]);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [newDoc, setNewDoc] = useState({ userId: '', documentName: '', status: 'PENDING' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const fetchDocuments = async () => {
        try {
            const response = await fetch('/api/documents');
            if (response.ok) {
                const data = await response.json();
                setAllDocuments(data);
            }
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleDeleteDocument = async (id) => {
        if (!window.confirm("Are you sure you want to delete this document?")) return;
        try {
            const response = await fetch(`/api/documents/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setMessage({ text: 'Document deleted successfully', type: 'success' });
                fetchDocuments();
            }
        } catch (error) {
            console.error("Error deleting document:", error);
            setMessage({ text: 'Failed to delete document', type: 'error' });
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ text: '', type: '' });

        try {
            const response = await fetch('/api/documents/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDoc)
            });

            if (response.ok) {
                setMessage({ text: 'Document registered successfully!', type: 'success' });
                setIsUploadModalOpen(false);
                setNewDoc({ userId: '', documentName: '', status: 'PENDING' });
                fetchDocuments();
            } else {
                setMessage({ text: 'Failed to upload document', type: 'error' });
            }
        } catch (error) {
            console.error("Upload error:", error);
            setMessage({ text: 'Connection error', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="data-section">
            <div className="data-header">
                <h3>Document Repository ({allDocuments.length})</h3>
                <button
                    className="primary-btn"
                    style={{ backgroundColor: '#6366f1' }}
                    onClick={() => setIsUploadModalOpen(true)}
                >
                    <PlusCircle size={18} />
                    Add Document
                </button>
            </div>

            {message.text && (
                <div style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: message.type === 'success' ? '#ecfdf5' : '#fef2f2',
                    color: message.type === 'success' ? '#059669' : '#dc2626',
                    border: `1px solid ${message.type === 'success' ? '#a7f3d0' : '#fee2e2'}`
                }}>
                    {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    {message.text}
                </div>
            )}

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Document Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allDocuments.length > 0 ? allDocuments.map((doc) => (
                            <tr key={doc.id}>
                                <td>#{doc.id}</td>
                                <td>{doc.userId || 'N/A'}</td>
                                <td style={{ fontWeight: '500' }}>{doc.documentName || 'Untitled'}</td>
                                <td>
                                    <span className={`badge ${doc.status === 'APPROVED' ? 'badge-success' : 'badge-warning'}`}>
                                        {doc.status || 'PENDING'}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteDocument(doc.id)}
                                        style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#fee2e2', color: '#991b1b', fontSize: '0.75rem', fontWeight: '600' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <AlertCircle size={32} color="#cbd5e1" style={{ margin: '0 auto 12px' }} />
                                    <p style={{ color: '#64748b' }}>No documents in repository.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white', padding: '32px', borderRadius: '16px',
                        width: '100%', maxWidth: '440px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h2 style={{ fontSize: '1.5rem' }}>Add New Document</h2>
                            <button onClick={() => setIsUploadModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                                <XCircle size={24} />
                            </button>
                        </div>
                        <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '0.925rem' }}>Provide document details below.</p>

                        <form onSubmit={handleUpload}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px' }}>Document Name</label>
                                <div className="input-wrapper">
                                    <FileText className="input-icon" size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="text" required placeholder="Tax_Return_2023.pdf"
                                        value={newDoc.documentName}
                                        onChange={(e) => setNewDoc({ ...newDoc, documentName: e.target.value })}
                                        style={{ width: '100%', padding: '10px 12px 10px 42px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px' }}>User ID</label>
                                <input
                                    type="number" required placeholder="User ID associated with this doc"
                                    value={newDoc.userId}
                                    onChange={(e) => setNewDoc({ ...newDoc, userId: e.target.value })}
                                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button
                                    type="button" onClick={() => setIsUploadModalOpen(false)}
                                    style={{ flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: '#f1f5f9', color: '#475569', fontWeight: '600', border: 'none' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit" disabled={isSubmitting}
                                    style={{
                                        flex: 2, padding: '12px', borderRadius: '8px',
                                        backgroundColor: '#6366f1', color: 'white',
                                        fontWeight: '600', border: 'none',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                        opacity: isSubmitting ? 0.7 : 1,
                                        cursor: 'pointer'
                                    }}
                                >
                                    {isSubmitting ? 'Saving...' : <><Upload size={18} /> Save Document</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Documents;
