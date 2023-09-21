import React, { useState, useEffect } from 'react';
import { Button, Modal, Checkbox, FormControl } from 'react-bootstrap';


const Problem2 = () => {
    const [showAllContactModal, setShowAllContactModal] = useState(false);
    const [showUSContactModal, setShowUSContactModal] = useState(false);
    const [showContactDetailsModal, setShowContactDetailsModal] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [onlyEven, setOnlyEven] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);

    const fetchContacts = async (country) => {
        const response = await fetch(`https://contact.mediusware.com/api/${country}`);
        const data = await response.json();
        setContacts(data);
    };

    useEffect(() => {
        fetchContacts('all');
    }, []);

    const openContactDetailsModal = () => {
        setShowContactDetailsModal(true);
    };

    const handleCloseModals = () => {
        setShowAllContactModal(false);
        setShowUSContactModal(false);
        setShowContactDetailsModal(false);
    };

    const handleModalSwitch = (country) => {
        if (country === 'all') {
            setShowAllContactModal(true);
        } else {
            setShowUSContactModal(true);
        }
    };

    const handleEvenCheckboxChange = () => {
        setOnlyEven(!onlyEven);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const filtered = contacts.filter((contact) => {
            if (onlyEven && contact.id % 2 !== 0) return false;
            if (searchQuery && !contact.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });
        setFilteredContacts(filtered);
    }, [contacts, onlyEven, searchQuery]);

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.target;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            setPage(page + 1);
        }
    };

    return (
        <div>
            <div className="text-center mt-5">
                <Button variant="primary" onClick={() => handleModalSwitch('all')}>
                    All Contacts
                </Button>
                <Button variant="warning" onClick={() => handleModalSwitch('us')}>
                    US Contacts
                </Button>
            </div>

            <Modal show={showAllContactModal || showUSContactModal} onHide={handleCloseModals} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{showAllContactModal ? 'All Contacts' : 'US Contacts'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="evenCheckbox"
                            checked={onlyEven}
                            onChange={handleEvenCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="evenCheckbox">
                            Only even
                        </label>
                    </div>
                    <FormControl
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleModalSwitch('all')}>
                        All Contacts
                    </Button>
                    <Button variant="warning" onClick={() => handleModalSwitch('us')}>
                        US Contacts
                    </Button>
                    <Button variant="danger" onClick={handleCloseModals}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showContactDetailsModal} onHide={() => setShowContactDetailsModal(false)}>
            </Modal>
        </div>
    );
};


export default Problem2;


