"use client"

import Switch from '@/components/Switch'
import Button from '@/components/Button'
import Typography from '@/components/Typography'
import Tag from '@/components/Tag'
import Avatar from '@/components/Avatar'
import Dropdown from '@/components/Dropdown'
import { Input } from '@/components/TextInput'
import LargeTextInput from '@/components/LargeTextInput'

import { EngagementCard } from '@/components/EngagementCard'
import { TimeDate } from '@/components/TimeDate'
import { TimeDateEngage } from '@/components/TimeDateEngage'

export default function Home() {
  const component_examples = [
    {
      name: "Switch primary",
      element:
        <Switch
          name='switch1'
          variant='primary'
        />
    },
    {
      name: "Switch secondary",
      element:
        <Switch
          name='switch2'
          variant='secondary'
        />
    },
    {
      name: "Switch disabled (off)",
      element:
        <Switch
          name='switch_disabled_off'
          checked={false}
          disabled={true}
        />
    },
    {
      name: "Switch disabled (on)",
      element:
        <Switch
          name='switch_disabled_on'
          checked={true}
          disabled={true}
        />
    },
    {
      name: "Button primary",
      element:
        <Button
          variant='primary'
        >
          Sign Up
        </Button>
    },
    {
      name: "Button secondary",
      element:
        <Button
          variant='secondary'
        >
          Secondary Button!
        </Button>
    },
    {
      name: "Button disabled",
      element:
        <Button disabled>
          Disabled Button!
        </Button>
    },
    {
      name: "Heading 1",
      element:
        <Typography variant='h1'>
          Heading 1
        </Typography>
    },
    {
      name: "Heading 2",
      element:
        <Typography variant='h2'>
          Heading 2
        </Typography>
    },
    {
      name: "Heading 3",
      element:
        <Typography variant='h3'>
          Heading 3
        </Typography>
    },
    {
      name: "Heading 4",
      element:
        <Typography variant='h4'>
          Heading 4
        </Typography>
    },
    {
      name: "Body text 1",
      element:
        <Typography variant='p1'>
          Body Text 1
        </Typography>
    },
    {
      name: "Body text 2",
      element:
        <Typography variant='p2'>
          Body Text 2
        </Typography>
    },
    {
      name: "Button text 1",
      element:
        <Typography variant='b1'>
          Button Text 1
        </Typography>
    },
    {
      name: "Button text 2",
      element:
        <Typography variant='b2'>
          Button Text 2
        </Typography>
    },
    {
      name: "Tag",
      element:
        <Tag 
          label="this is a tag"
          handleClose={() => {alert("tag closed")}}
        />
    },
    {
      name: "Avatar",
      element:
        <Avatar image="images/output.jpg" />
    },
    {
      name: "Dropdown",
      element:
        <Dropdown
        options={["Calendar", "List"]}
        onSelect={(selectedOption) => alert('Selected: ${selectedOption}')}
        />
    },
    {
      name: "Large Text Input",
      element:
        <LargeTextInput placeholder="Enter text here" />
    },
    {
      name: "Engagement Card",
      element:
      <EngagementCard image={"./pfp.png"} location="Beebe Library, Wakefield" startTime='10:00am' endTime='5:00pm' date='9/24/24' full={false} />

    },
    {
      name: "TimeDate Engage",
      element:
      <TimeDateEngage startTime="10:00am" endTime="2:00pm" date="9/20/24" />
    },
  ]

  return (
    <>
      <div className="flex justify-center">
        <table className="w-screen overflow-hidden border-collapse rounded-sm table-auto">
          <thead>
            <tr className="leading-normal text-gray-600 uppercase bg-gray-200">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Component</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {component_examples.map(component => (
              <tr key={component.name} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-6 py-3 text-left">
                  {component.name}
                </td>
                <td className="px-6 py-3 text-left">
                  {component.element}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}