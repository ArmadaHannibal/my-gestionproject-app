"use client"; // Indique que ce fichier est un composant client

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Image from "next/image"
import Link from "next/link"
import {
    Home,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    ShoppingCart,
    ChevronDown,
    ArrowUpDown,
    MoreHorizontal,
    Users2,
} from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
// import { Button } from "@/components/ui/button"
import { Button } from "@nextui-org/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
} from "@/components/ui/chart"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Inputui } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip";
import {
    Bar,
    BarChart,
    LabelList,
    LineChart,
    PolarAngleAxis,
    RadialBar,
    RadialBarChart,
    XAxis,
    YAxis,
} from "recharts";

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { ThemeSwitch } from "@/components/theme-switch";
import { Avatar, AvatarIcon } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { VscKebabVertical } from "react-icons/vsc";
import { Input } from "@nextui-org/react";

import { RiUserFollowFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";

import { Buttonui } from "@/components/ui/button";

import { Navbardashboardright } from '@/components/navbardashboardright';
import { Navbardashboardtop } from '@/components/navbardashboardtop';

const data: Payment[] = [
    {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@yahoo.com",
    },
    {
        id: "3u1reuv4",
        amount: 242,
        status: "success",
        email: "Abe45@gmail.com",
    },
    {
        id: "derv1ws0",
        amount: 837,
        status: "processing",
        email: "Monserrat44@gmail.com",
    },
    {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@gmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
]

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Buttonui
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Buttonui>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Buttonui variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Buttonui>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function ProfilePage() {
    const [user, setUser] = useState<{ _id: string; name: string; email: string; role: string; profilePhoto?: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [imageSrc, setImageSrc] = useState(null);
    const [editing, setEditing] = useState(false);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [position, setPosition] = React.useState();
    const [isVisible, setIsVisible] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePhoto, setProfilePhoto] = useState();
    const [filephoto, setFilephoto] = useState<File | null>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                    setName(data.name); // Set name after fetching user
                    setEmail(data.email); // Set email after fetching user
                    setProfilePhoto(data.profilePhoto || '');
                } else {
                    router.push('/login'); // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    const handleAvatarClick = () => {
        setEditing(true);
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (e.target.files) {
            setFilephoto(e.target.files[0]);
        }
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = async () => {
            setImageSrc(reader.result as string);
            setEditing(false);
        };

        reader.readAsDataURL(file);

    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (filephoto) {
            const formData = new FormData();
            formData.append('file', filephoto);
            formData.append('username', name);
            formData.append('id', user?._id);

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (res.ok) {
                    setMessage('File uploaded successfully');
                    const dataUser = await res.json();
                    // Mettre à jour le profil utilisateur après avoir obtenu l'URL du fichier
                    await updateUserProfile(dataUser.fileUrl);
                } else {
                    setMessage('Failed to upload file');
                }
            } catch (error) {
                setMessage('Error uploading file:', error);
            }
        } else {
            await updateUserProfile('');
        }
    };

    const updateUserProfile = async (fileUrl) => {
        try {
            const res = await fetch(`/api/updateProfile/${user?._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name,
                    email,
                    profilePhoto: fileUrl,
                }),
            });

            if (res.ok) {
                setMessage('Profile updated successfully');
                window.location.reload(); // Rafraîchir la page pour refléter les modifications
            } else {
                const errorData = await res.json();
                setMessage(`Error updating profile: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile');
        }
    };

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const handleClick = (value) => {
        setPosition(value);
        if (value == 'modifierUser') {
            setIsVisible(false);
        } else if (value == 'createuser') {
            router.push('/dashboard/membre');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {user ? (
                <div className="flex min-h-screen w-full flex-col bg-muted/40">
                    <Navbardashboardright />
                    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                        <Navbardashboardtop profilePhoto={profilePhoto} />
                        <main className="p-4">
                            <div className='flex flex-row space-x-11'>
                                <div>
                                    <div className='contentProfilUser'>
                                        <div className='flex justify-end py-2 px-2 w-full h-full'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Buttonui variant="outline" size="icon">
                                                        <VscKebabVertical className='w-4 h-4' />
                                                    </Buttonui>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56">
                                                    <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuRadioGroup value={position} onValueChange={handleClick}>
                                                        <DropdownMenuRadioItem value="modifierUser">Modifier</DropdownMenuRadioItem>
                                                        <DropdownMenuRadioItem value="createprojets">Creer un projets</DropdownMenuRadioItem>
                                                        <DropdownMenuRadioItem value="createuser">Creer un utilisateur</DropdownMenuRadioItem>
                                                        <DropdownMenuRadioItem value="createquipe">creer une équipe</DropdownMenuRadioItem>
                                                    </DropdownMenuRadioGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <div className='flex flex-col space-y-5 px-3 py-3'>
                                            <div className="flex items-center justify-center">
                                                <div>
                                                    <Avatar
                                                        {...(profilePhoto
                                                            ? { src: profilePhoto }
                                                            : { icon: <AvatarIcon /> })}
                                                        classNames={{
                                                            base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                                                            icon: "text-black/80",
                                                        }}
                                                        className='w-32 h-32'
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex flex-col space-y-3'>
                                                <div className="flex justify-center gap-4">
                                                    <Chip
                                                        startContent={<FaUser className='w-3.5 h-3.5' />}
                                                        variant="faded"
                                                        color="success"
                                                    >
                                                        Nom: {user.name}
                                                    </Chip>
                                                </div>
                                                <div className="flex justify-center gap-4">
                                                    <Chip
                                                        startContent={<MdEmail className='w-3.5 h-3.5' />}
                                                        variant="faded"
                                                        color="success"
                                                    >
                                                        Email: {user.email}
                                                    </Chip>
                                                </div>
                                                <div className="flex justify-center gap-4">
                                                    <Chip color="success" variant="dot">{user.role}</Chip>
                                                </div>
                                                <div className="flex justify-center gap-4">
                                                    <Chip color="success" variant="shadow">Connecté</Chip>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='relative contentProfilUserDetail'>
                                    <div className='absolute coverUpdateUser bg-black z-20 opacity-40' style={{ display: isVisible ? "block" : "none", }}></div>
                                    <form onSubmit={handleSubmit}>
                                        <div className='flex items-center pl-5 pt-5 space-x-5'>
                                            <div>
                                                <div onClick={handleAvatarClick}>
                                                    <Avatar
                                                        {...(profilePhoto
                                                            ? { src: profilePhoto }
                                                            : { icon: <AvatarIcon /> })}
                                                        classNames={{
                                                            base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                                                            icon: "text-black/80",
                                                        }}
                                                        className='w-32 h-32 cursor-pointer'
                                                    />
                                                </div>
                                                {editing && (
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        style={{ display: 'none' }}
                                                        ref={input => input && input.click()} // Pour déclencher le champ de fichier
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex justify-center gap-4">
                                                    <Chip color="success" variant="dot">{user.role}</Chip>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='px-5 space-y-5'>
                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Input type="text" variant='underlined' label="Nom" value={name} onChange={(e) => setName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Input type="email" variant='underlined' label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className='flex w-full justify-end'>
                                                <div className="flex gap-4 items-center">
                                                    <Button type='submit' color="primary" endContent={<FaUserEdit />}>
                                                        Modifier
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    {message && <p>{message}</p>}
                                </div>
                                <div className='flex flex-col space-y-5'>
                                    <div className='flex justify-center'>
                                        <Card
                                            className="max-w-xs w-full" x-chunk="charts-01-chunk-5"
                                        >
                                            <CardContent className="flex gap-4 p-4">
                                                <div className="grid items-center gap-2">
                                                    <div className="grid flex-1 auto-rows-min gap-0.5">
                                                        <div className="text-sm text-muted-foreground">Move</div>
                                                        <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                                                            562/600
                                                            <span className="text-sm font-normal text-muted-foreground">
                                                                kcal
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="grid flex-1 auto-rows-min gap-0.5">
                                                        <div className="text-sm text-muted-foreground">Exercise</div>
                                                        <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                                                            73/120
                                                            <span className="text-sm font-normal text-muted-foreground">
                                                                min
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="grid flex-1 auto-rows-min gap-0.5">
                                                        <div className="text-sm text-muted-foreground">Stand</div>
                                                        <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                                                            8/12
                                                            <span className="text-sm font-normal text-muted-foreground">
                                                                hr
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ChartContainer
                                                    config={{
                                                        move: {
                                                            label: "Move",
                                                            color: "hsl(var(--chart-1))",
                                                        },
                                                        exercise: {
                                                            label: "Exercise",
                                                            color: "hsl(var(--chart-2))",
                                                        },
                                                        stand: {
                                                            label: "Stand",
                                                            color: "hsl(var(--chart-3))",
                                                        },
                                                    }}
                                                    className="mx-auto aspect-square w-full max-w-[80%]"
                                                >
                                                    <RadialBarChart
                                                        margin={{
                                                            left: -10,
                                                            right: -10,
                                                            top: -10,
                                                            bottom: -10,
                                                        }}
                                                        data={[
                                                            {
                                                                activity: "stand",
                                                                value: (8 / 12) * 100,
                                                                fill: "var(--color-stand)",
                                                            },
                                                            {
                                                                activity: "exercise",
                                                                value: (46 / 60) * 100,
                                                                fill: "var(--color-exercise)",
                                                            },
                                                            {
                                                                activity: "move",
                                                                value: (245 / 360) * 100,
                                                                fill: "var(--color-move)",
                                                            },
                                                        ]}
                                                        innerRadius="20%"
                                                        barSize={24}
                                                        startAngle={90}
                                                        endAngle={450}
                                                    >
                                                        <PolarAngleAxis
                                                            type="number"
                                                            domain={[0, 100]}
                                                            dataKey="value"
                                                            tick={false}
                                                        />
                                                        <RadialBar dataKey="value" background cornerRadius={5} />
                                                    </RadialBarChart>
                                                </ChartContainer>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className='flex justify-center'>
                                        <Card
                                            className="max-w-xs" x-chunk="charts-01-chunk-2"
                                        >
                                            <CardHeader>
                                                <CardTitle>Progress</CardTitle>
                                                <CardDescription>
                                                    You're average more steps a day this year than last year.
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="grid gap-4">
                                                <div className="grid auto-rows-min gap-2">
                                                    <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                                        12,453
                                                        <span className="text-sm font-normal text-muted-foreground">
                                                            steps/day
                                                        </span>
                                                    </div>
                                                    <ChartContainer
                                                        config={{
                                                            steps: {
                                                                label: "Steps",
                                                                color: "hsl(var(--chart-1))",
                                                            },
                                                        }}
                                                        className="aspect-auto h-[32px] w-full"
                                                    >
                                                        <BarChart
                                                            accessibilityLayer
                                                            layout="vertical"
                                                            margin={{
                                                                left: 0,
                                                                top: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                            }}
                                                            data={[
                                                                {
                                                                    date: "2024",
                                                                    steps: 12435,
                                                                },
                                                            ]}
                                                        >
                                                            <Bar
                                                                dataKey="steps"
                                                                fill="var(--color-steps)"
                                                                radius={4}
                                                                barSize={32}
                                                            >
                                                                <LabelList
                                                                    position="insideLeft"
                                                                    dataKey="date"
                                                                    offset={8}
                                                                    fontSize={12}
                                                                    fill="white"
                                                                />
                                                            </Bar>
                                                            <YAxis dataKey="date" type="category" tickCount={1} hide />
                                                            <XAxis dataKey="steps" type="number" hide />
                                                        </BarChart>
                                                    </ChartContainer>
                                                </div>
                                                <div className="grid auto-rows-min gap-2">
                                                    <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                                        10,103
                                                        <span className="text-sm font-normal text-muted-foreground">
                                                            steps/day
                                                        </span>
                                                    </div>
                                                    <ChartContainer
                                                        config={{
                                                            steps: {
                                                                label: "Steps",
                                                                color: "hsl(var(--muted))",
                                                            },
                                                        }}
                                                        className="aspect-auto h-[32px] w-full"
                                                    >
                                                        <BarChart
                                                            accessibilityLayer
                                                            layout="vertical"
                                                            margin={{
                                                                left: 0,
                                                                top: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                            }}
                                                            data={[
                                                                {
                                                                    date: "2023",
                                                                    steps: 10103,
                                                                },
                                                            ]}
                                                        >
                                                            <Bar
                                                                dataKey="steps"
                                                                fill="var(--color-steps)"
                                                                radius={4}
                                                                barSize={32}
                                                            >
                                                                <LabelList
                                                                    position="insideLeft"
                                                                    dataKey="date"
                                                                    offset={8}
                                                                    fontSize={12}
                                                                    fill="hsl(var(--muted-foreground))"
                                                                />
                                                            </Bar>
                                                            <YAxis dataKey="date" type="category" tickCount={1} hide />
                                                            <XAxis dataKey="steps" type="number" hide />
                                                        </BarChart>
                                                    </ChartContainer>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="flex items-center py-4">
                                    <Input
                                        placeholder="Filter emails..."
                                        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                                        onChange={(event) =>
                                            table.getColumn("email")?.setFilterValue(event.target.value)
                                        }
                                        className="max-w-sm"
                                    />
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Buttonui variant="outline" className="ml-auto">
                                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                                            </Buttonui>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {table
                                                .getAllColumns()
                                                .filter((column) => column.getCanHide())
                                                .map((column) => {
                                                    return (
                                                        <DropdownMenuCheckboxItem
                                                            key={column.id}
                                                            className="capitalize"
                                                            checked={column.getIsVisible()}
                                                            onCheckedChange={(value) =>
                                                                column.toggleVisibility(!!value)
                                                            }
                                                        >
                                                            {column.id}
                                                        </DropdownMenuCheckboxItem>
                                                    )
                                                })}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            {table.getHeaderGroups().map((headerGroup) => (
                                                <TableRow key={headerGroup.id}>
                                                    {headerGroup.headers.map((header) => {
                                                        return (
                                                            <TableHead key={header.id}>
                                                                {header.isPlaceholder
                                                                    ? null
                                                                    : flexRender(
                                                                        header.column.columnDef.header,
                                                                        header.getContext()
                                                                    )}
                                                            </TableHead>
                                                        )
                                                    })}
                                                </TableRow>
                                            ))}
                                        </TableHeader>
                                        <TableBody>
                                            {table.getRowModel().rows?.length ? (
                                                table.getRowModel().rows.map((row) => (
                                                    <TableRow
                                                        key={row.id}
                                                        data-state={row.getIsSelected() && "selected"}
                                                    >
                                                        {row.getVisibleCells().map((cell) => (
                                                            <TableCell key={cell.id}>
                                                                {flexRender(
                                                                    cell.column.columnDef.cell,
                                                                    cell.getContext()
                                                                )}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={columns.length}
                                                        className="h-24 text-center"
                                                    >
                                                        No results.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="flex items-center justify-end space-x-2 py-4">
                                    <div className="flex-1 text-sm text-muted-foreground">
                                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                        {table.getFilteredRowModel().rows.length} row(s) selected.
                                    </div>
                                    <div className="space-x-2">
                                        <Buttonui
                                            variant="outline"
                                            size="sm"
                                            onClick={() => table.previousPage()}
                                            disabled={!table.getCanPreviousPage()}
                                        >
                                            Previous
                                        </Buttonui>
                                        <Buttonui
                                            variant="outline"
                                            size="sm"
                                            onClick={() => table.nextPage()}
                                            disabled={!table.getCanNextPage()}
                                        >
                                            Next
                                        </Buttonui>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            ) : (
                <div>Aucun utilisateur trouvé</div>
            )}
        </div>
    );
}
