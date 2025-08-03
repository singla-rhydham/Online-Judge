import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './contribute.css'; // optional styling

const Contribute = () => {

    const navigate = useNavigate();

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains('contribute-container')) {
            const confirmExit = window.confirm("Progress may be lost. Do you really want to leave?");
            if (confirmExit) {
                navigate(-1);
            }
            // Else, do nothing (stay on form)
        }
    };

    const [formData, setFormData] = useState({
        problemName: '',
        difficulty: 'Easy',
        topicTag: '',
        description: '',
        sampleInput: '',
        sampleOutput: '',
        hiddenInput: '',
        hiddenOutput: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare payload with correct formats
        const payload = {
            ...formData,
            topicTags: formData.topicTags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0),
            hiddenTestCases: formData.hiddenTestCases
                .split('\n')
                .map(tc => tc.trim())
                .filter(tc => tc.length > 0),
            hiddenOutputs: formData.hiddenOutputs
                .split('\n')
                .map(out => out.trim())
                .filter(out => out.length > 0),
        };

        try {
            const response = await axios.post('http://54.80.126.183/contribute', payload);
            alert(response.data);
            // Optionally reset the form:
            setFormData({
                problemName: '',
                difficulty: 'Easy',
                topicTags: '',
                description: '',
                sampleInput: '',
                sampleOutput: '',
                hiddenTestCases: '',
                hiddenOutputs: ''
            });
        } catch (err) {
            alert('Submission failed');
            console.error(err);
        }
    };
    
    return (
        <div className="contribute-container" onClick={handleBackgroundClick}>
        <form className="contribute-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            <h2 className='contribute-title'>Contribute New Problem</h2>
            <input
                type="text"
                name="problemName"
                placeholder="Problem Name"
                value={formData.problemName}
                onChange={handleChange}
                required
                />

            <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>

            <input
                type="text"
                name="topicTags"
                placeholder="Topic Tags (comma separated)"
                value={formData.topicTags}
                onChange={handleChange}
                />

            <textarea
                name="description"
                placeholder="Problem Description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
                />

            <textarea
                name="sampleInput"
                placeholder="Sample Input"
                value={formData.sampleInput}
                onChange={handleChange}
                rows={3}
                />

            <textarea
                name="sampleOutput"
                placeholder="Sample Output"
                value={formData.sampleOutput}
                onChange={handleChange}
                rows={3}
                />

            <textarea
                name="hiddenTestCases"
                placeholder="Hidden Test Cases (one per line)"
                value={formData.hiddenTestCases}
                onChange={handleChange}
                rows={4}
                />

            <textarea
                name="hiddenOutputs"
                placeholder="Hidden Outputs (one per line)"
                value={formData.hiddenOutputs}
                onChange={handleChange}
                rows={4}
                />

            <button type="submit">Submit Problem</button>
        </form>
    </div>
);
};

export default Contribute;